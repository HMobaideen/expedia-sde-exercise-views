import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

/**
 * Hotels Finder component 
 * 
 * @author Haneen Mobaideen
 */
export class AppComponent implements OnInit {

  public hotels: any;
  public filterParams = {
    destinationName: "",
    lengthOfStay: "",
    maxTripStartDate: "",
    minTripStartDate: "",
    maxStartRating: "",
    minStartRating: "",
    maxTotalRating: "",
    minTotalRating: "",
    maxGuestRating: "",
    minGuestRating: ""
  };
  public showDataView = false;
  @ViewChild("fieldSetSearch") fieldSetSearch;
  @ViewChild("dataView") dataView;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  /**
   * Method to build array of hotel objects 
   * 
   * produced hotel object = {  hotelImageUrl,hotelInfositeUrl
   *                 , hotelGuestReviewRating,hotelPricingInfo.currency
   *                 , hotelPricingInfo.averagePriceValue }
   * 
   */
  getHotels() {
    let headers = new HttpHeaders();
    headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post('http://localhost:8888/hotels/webapi/hotelsFinder'
      , this.getFilterParams()
      , { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe((result: any) => {
        
        if (result.offers && result.offers.Hotel && result.offers.Hotel.length > 0) {
          this.hotels = result.offers.Hotel;
          this.fieldSetSearch.collapsed = true;

        } else {
          this.hotels = [];
        }
        this.showDataView = true;
      },
        (error) => {
          this.hotels = [];
          console.log(error);
        });
  }

  /**
   * Method to prepare filter parameters as HttpParams
   * 
   */
  getFilterParams(): HttpParams {
    let filterHttpParams = new HttpParams();
    Object.keys(this.filterParams).forEach(paramKey => {
      const paramValue = this.filterParams[paramKey];
      if (paramValue != null)
        filterHttpParams = filterHttpParams.append(paramKey.toString(), this.filterParams[paramKey]);
    });

    return filterHttpParams;
  }

}

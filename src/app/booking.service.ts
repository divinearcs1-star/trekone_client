import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  dbname = "Trekways"
  collectionname = "Bookings"

  bookingUrl = `${environment.apiUrl}` + '/booking/' + this.dbname + '/' + this.collectionname
  verifypaymentUrl = `${environment.apiUrl}` + '/verifypayment/' + this.dbname + '/' + this.collectionname

  constructor(private http: HttpClient) {
  }

  getbookingdata(userdata :any) {
    return this.http.post<any>(this.bookingUrl,userdata);
  }

  getverifysignature(signaturedata :any, bookid :string) {
    this.verifypaymentUrl = this.verifypaymentUrl + '/' + bookid;
    return this.http.post<any>(this.verifypaymentUrl,signaturedata);
  }
}

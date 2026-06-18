import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  dbname = "Trekways"
  collectionname = "Bookings"

  bookingUrl = 'http://localhost:3000/api/booking/' + this.dbname + '/' + this.collectionname
  verifypaymentUrl = 'http://localhost:3000/api/verifypayment/' + this.dbname + '/' + this.collectionname

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

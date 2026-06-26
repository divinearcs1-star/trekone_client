import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  bookingUrl = `${environment.apiUrl}` + '/booking/create-Order'
  verifypaymentUrl = `${environment.apiUrl}` + '/payment/verifypayment'

  constructor(private http: HttpClient) {
  }

  createOrder(userdata :any) {
    return this.http.post<any>(this.bookingUrl,userdata);
  }

  getverifysignature(signaturedata :any) {
    return this.http.post<any>(this.verifypaymentUrl,signaturedata);
  }
}

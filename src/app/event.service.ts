import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  eventsUrl = `${environment.apiUrl}` + '/trek/allTrek'
  filtereventsUrl = `${environment.apiUrl}` + '/trek/filterTrek'
  specialeventsUrl = `${environment.apiUrl}` + '/trek/specialTrek'
  bookingsUrl = `${environment.apiUrl}` + '/booking/mybookings/'
  cancelBookingUrl = `${environment.apiUrl}` + '/booking/cancel-booking'
  cancelAndRefundUrl = `${environment.apiUrl}` + '/payment/cancel-refund'

  constructor(private http: HttpClient) {
  }

  getEvents() {
    return this.http.get<any>(this.eventsUrl);
  }

  getFilterByDateEvents() {
    return this.http.get<any>(this.filtereventsUrl);
  }

  getSpecialevents() {
    return this.http.get<any>(this.specialeventsUrl);
  }

  getBookings(email: any) {
    return this.http.get<any>(this.bookingsUrl + email);
  }

  getReceipt(userdata: any) {
    return this.http.get<any>(this.bookingsUrl + userdata);
  }

  cancelBooking(bookingid: any) {
    return this.http.post<any>(this.cancelBookingUrl, { bookingid });
  }

  cancelAndRefund(payload: any) {
    return this.http.post<any>(this.cancelAndRefundUrl, payload);
  }
}

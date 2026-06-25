import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  // eventsUrl = 'http://localhost:3000/api/trek'
  eventsUrl = `${environment.apiUrl}` + '/api/trek'

  filtereventsUrl = `${environment.apiUrl}` + '/api/filtertrek'
  specialeventsUrl = `${environment.apiUrl}` + '/api/specialtrek'
  bookingsUrl = `${environment.apiUrl}` + '/api/mybookings/'
  cancelBookingUrl = `${environment.apiUrl}` + '/api/mybookings/'
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

  cancelBooking(bookingid: any) {
    return this.http.post<any>(this.bookingsUrl,  { bookingid });
  }

  cancelAndRefund(payload: any) {
    return this.http.post<any>(this.cancelAndRefundUrl , payload);
  }
}

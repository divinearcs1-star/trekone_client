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
  bookingsUrl = `${environment.apiUrl}` + '/booking/mybookings'
  cancelRefundUrl = `${environment.apiUrl}` + '/booking/cancel-refund'

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

  getBookings() {
    return this.http.get<any>(this.bookingsUrl);
  }

  cancelRefund(bookingId: any) {
    return this.http.post<any>(this.cancelRefundUrl, { bookingId });
  }

  getAllBookings() {
    return this.http.get(
      `${environment.apiUrl}/admin/all-bookings`
    );
  }

  // getTrekById(id: string, type: string) {
  //   return this.http.get(
  //     `${environment.apiUrl}/admin/trek/${id}/${type}`
  //   );
  // }

  // updateTrek(id: string, type: string, trekData: any) {
  //   return this.http.put(
  //     `${environment.apiUrl}/admin/update-trek/${id}/${type}`,
  //     trekData
  //   );
  // }

  // deleteTrek(id: string, type: string) {
  //   return this.http.delete(
  //     `${environment.apiUrl}/admin/delete-trek/${id}/${type}`
  //   );
  // }

}

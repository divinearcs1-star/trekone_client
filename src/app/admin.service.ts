import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {
  }

  getStats() {
    return this.http.get(`${this.baseUrl}/stats`);
  }

  getBookings() {
    return this.http.get(`${this.baseUrl}/bookings`);
  }

  getTreks() {
    return this.http.get(`${this.baseUrl}/treks`);
  }

  getRefunds() {
    return this.http.get(`${this.baseUrl}/refunds`);
  }

  getAllBookings() {
    return this.http.get(`${this.baseUrl}/allBookings`);
  }

  addTrek(data: any) {
    return this.http.post(`${this.baseUrl}/add-trek`, data);
  }

  getTrekById(id: string) {
    return this.http.get(
      `${this.baseUrl}/trek/${id}`
    );
  }

  updateTrek(id: string, data: any) {
    return this.http.put(
      `${this.baseUrl}/update-trek/${id}`,
      data
    );
  }

  deleteTrek(id: string) {
    return this.http.delete(
      `${this.baseUrl}/delete-trek/${id}`
    );
  }

  getRefundRequests() {
    return this.http.get(
      `${this.baseUrl}/refunds`
    );
  }

  approveRefundRequests(bookid : any) {
    return this.http.post<any>(
      `${this.baseUrl}/approve-refund`,{bookingid : bookid}
    );
  }

  rejectRefundRequests(bookid: any) {
    return this.http.post<any>(
      `${this.baseUrl}/reject-refund`,{bookingid : bookid}
    );
  }

  getAllUsers() {
    return this.http.get(
      `${this.baseUrl}/users`
    );
  }

  makeAdmin(id: string) {
    return this.http.put(
      `${this.baseUrl}/make-admin/${id}`,
      {}
    );
  }

  getPayments() {
    return this.http.get(
      `${this.baseUrl}/payments`
    );
  }

  blockUser(id: string) {
    return this.http.put(
      `${this.baseUrl}/block-user/${id}`,
      {}
    );
  }

  unblockUser(id: string) {
    return this.http.put(
      `${this.baseUrl}/unblock-user/${id}`,
      {}
    );
  }
}

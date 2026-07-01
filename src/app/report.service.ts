import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  reportsUrl =  `${environment.apiUrl}` + '/admin/reports/bookings-report'

  getBookingsReport() {
    return this.http.get(this.reportsUrl);
  }


}

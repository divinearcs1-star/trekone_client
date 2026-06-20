import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  dbname = "Trekways"
  freecollection = "Freetrek"
  paidcollection = "Paidtrek"

  // eventsUrl = 'http://localhost:3000/api/trek/' + this.dbname + '/' + this.freecollection
  eventsUrl = `${environment.apiUrl}` + '/trek/' + this.dbname + '/' + this.freecollection;

  filtereventsUrl = `${environment.apiUrl}` + '/filtertrek/' + this.dbname + '/' + this.freecollection;

  specialeventsUrl = `${environment.apiUrl}` + '/specialtrek/' + this.dbname + '/' + this.paidcollection;

  constructor(private http: HttpClient) {
  }

  getEvents() {
    return this.http.get<any>(this.eventsUrl);
  }

  getFilterByDateEvents() {
    return this.http.get<any>(this.filtereventsUrl);
  }
  
  getSpecialevents() {
    return this.http.get<any>(this.eventsUrl);
  }
}

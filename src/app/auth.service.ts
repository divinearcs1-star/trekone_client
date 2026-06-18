import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
 import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  dbname = "UserAdmin"
  collectionname = "Users"
  loginUrl = `${environment.apiUrl}` + '/login/' + this.dbname + '/' + this.collectionname
  registerUrl = `${environment.apiUrl}` + '/register'
  
  constructor(private http: HttpClient, private router: Router) {
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loginUser(user: any) {
    console.log("going to server")
    return this.http.post<any>(this.loginUrl, user);
  }

  logoutUser() {
    localStorage.removeItem('token');
    return this.router.navigate(['/events']);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  registerUser(userdata: any) {
    console.log("going to server")
    return this.http.post<any>(this.registerUrl, userdata);
  }

}

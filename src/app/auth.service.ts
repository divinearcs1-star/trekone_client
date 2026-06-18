import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  dbname = "UserAdmin"
  collectionname = "Users"
  loginUrl = 'http://localhost:3000/api/login/' + this.dbname + '/' + this.collectionname
  registerUrl = 'http://localhost:3000/api/register'

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

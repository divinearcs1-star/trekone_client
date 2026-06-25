import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = `${environment.apiUrl}` + '/auth/login'
  registerUrl = `${environment.apiUrl}` + '/auth/register'
  forgotPasswordUrl = `${environment.apiUrl}` + '/auth/forgot-password'
  resetPasswordUrl = `${environment.apiUrl}` + '/auth/reset-password'

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
    return this.router.navigate(['/']);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  registerUser(userdata: any) {
    console.log("going to server")
    return this.http.post<any>(this.registerUrl, userdata);
  }


  forgotPassword(useremail: any) {
    console.log("going to server")
    return this.http.post<any>(this.forgotPasswordUrl, {
      email : useremail
    });
  }

  resetPassword(token: string, password: string) {
    return this.http.post<any>(this.resetPasswordUrl, {
      token,
      password
    });
  }

}

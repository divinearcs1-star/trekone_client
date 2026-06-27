import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = `${environment.apiUrl}` + '/api/login'
  registerUrl = `${environment.apiUrl}` + '/api/register'
  forgotPasswordUrl = `${environment.apiUrl}` + '/auth/forgot-password'
  resetPasswordUrl = `${environment.apiUrl}` + '/auth/reset-password'
  refreshTokenUrl = `${environment.apiUrl}` + '/api/refresh-token'
  logoutUrl = `${environment.apiUrl}` + '/api/logout'

  constructor(private http: HttpClient, private router: Router) {
  }

  loginUser(user: any) {
    console.log("going to server")
    return this.http.post<any>(this.loginUrl, user);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  logoutUser() {
    this.logout();
  }

  loggedIn() {
    return !!localStorage.getItem('accessToken');
  }

  registerUser(userdata: any) {
    console.log("going to server")
    return this.http.post<any>(this.registerUrl, userdata);
  }

  forgotPassword(useremail: any) {
    console.log("going to server")
    return this.http.post<any>(this.forgotPasswordUrl, {
      email: useremail
    });
  }

  resetPassword(token: string, password: string) {
    return this.http.post<any>(this.resetPasswordUrl, {
      token,
      password
    });
  }

  saveTokens(accessToken: string, refreshToken: string, role: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('role', role);
  }

  refreshToken() {
    return this.http.post<any>(this.refreshTokenUrl, {
      refreshToken: this.getRefreshToken()
    });
  }

  logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    this.http.post(this.logoutUrl, { refreshToken }).subscribe(
      {
        next: () => {
          localStorage.clear();
          this.router.navigate(['/']);
        },
        error: () => {
          localStorage.clear();
          this.router.navigate(['/']);
        }
      });
  }

  getAllUsers() {
    return this.http.get(
      `${environment.apiUrl}/admin/all-users`
    );
  }

  toggleUserBlock(id: string) {
    return this.http.put(
      `${environment.apiUrl}/admin/toggle-user-block/${id}`,
      {}
    );
  }

  deleteUser(id: string) {
    return this.http.delete(
      `${environment.apiUrl}/admin/delete-user/${id}`
    );
  }
}

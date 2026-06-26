import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) {

  }
  intercept(req: any, next: any): Observable<HttpEvent<any>> {
    console.log("Interceptor Called");
    let authService = this.injector.get(AuthService)
    let tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'bearer ' + authService.getAccessToken())
      }
    )
    return next.handle(tokenizedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Access token expired
        if (error.status === 401 && !req.url.includes('/refresh-token') && authService.getRefreshToken()) {
          console.log("Access token expired, refreshing...");
          return authService.refreshToken().pipe(
            switchMap((res: any) => {
              // Save new access token
              // localStorage.setItem('accessToken', res.accessToken);
              localStorage.setItem('accessToken', res.accessToken);
              localStorage.setItem('refreshToken', res.refreshToken);
              // Retry original request with new token
              let newReq = req.clone({
                headers: req.headers.set(
                  'Authorization',
                  'Bearer ' + res.accessToken
                )
              });
              return next.handle(newReq);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}


import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service'
import { AccountService } from './account.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService, private authService: AuthService) {}

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     return next.handle(request).pipe(catchError(err => {
    //         if ([401, 403].includes(err.status) && this.accountService.userValue) {
    //             // auto logout if 401 or 403 response returned from api
    //             this.accountService.logout();
    //         }

    //         const error = err.error?.message || err.statusText;
    //         console.error(err);
    //         return throwError(error);
    //     }))
    // }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        // Clone the existing request, and add the authorization header
        request = request.clone({
          setHeaders: {
            Authorization: `JWT ${this.authService.getToken()}`
          }
        });
        // Pass the request on to the next handler
        return next.handle(request);
      }
    

}
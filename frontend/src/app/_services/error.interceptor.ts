import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service'
import { AccountService } from './account.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService,  private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
        .pipe(
          // catchError(err => {
          //   let errorMessage ='';
            // if ([401, 403].includes(err.status) && this.accountService.userValue) {
            //     // auto logout if 401 or 403 response returned from api
            //     this.authService.logout();
            // }

            // const error = err.error?.message || err.statusText;
            // console.error("error interceptor:",err);

            // if (error.error instanceof ErrorEvent) {

            //   // client-side error
   
            //   errorMessage = `Error: ${error.error.description}`;
   
            // } else {
   
            //   // server-side error
   
            //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.discription}`;
   
            // }
   
            // window.alert(errorMessage);
   

            // return throwError(errorMessage);

            


        // })
        )
    }

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    //     // Clone the existing request, and add the authorization header
    //     request = request.clone({
    //       setHeaders: {
    //         Authorization: `JWT ${this.authService.getToken()}`
    //       }
    //     });
    //     // Pass the request on to the next handler
    //     return next.handle(request);
    //   }
    

}
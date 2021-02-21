import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private _router: Router,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = this.handleError(error);
          return throwError(errorMessage);
        })
      )
  }

  private handleError = (error: HttpErrorResponse): any => {
    // if(error.status === 404){
    //   return this.handleNotFound(error);
    // }
    // else 
    if (error.status === 400) {
      return this.handleBadRequest(error);
    }
  }

  private handleBadRequest(error: HttpErrorResponse): string {
    // throw new Error('Method not implemented.');
    if (this._router.url === '/binCreate') {
      let message = '';
      const values = Object.values(error.error.errors);
      values.map((m: any) => {
        message += m + '<br>';
      })
      return message.slice(0, -4);
    }
    else {
      return error.error ? error.error : error.message;
    }
  }

}
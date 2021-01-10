import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';


const helper = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
      
    }

  

    public getToken(): string {
        return localStorage.getItem('accessToken');
      }
    
      public readToken(): any{
        const token = localStorage.getItem('accessToken');
        return helper.decodeToken(token);
      }

      isAuthenticated(): boolean {
        const token = localStorage.getItem('access_token');

        if(helper.isTokenExpired(token))  {
            console.log("tokenExpire:", helper.isTokenExpired(token));
            return true;
        }
        else {
            return false;
        }   
     
      }

    // login(email:any, password: any){
    //    return this.http.post<User>(`${environment.apiUrl}/api/account/login`, {email, password})
    //                    .shareReplay();

    // }
    loginn(email:any, password:any) {
      return this.http.post<User>(`${environment.apiUrl}/api/account/login`, { email, password })
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('user', JSON.stringify(user));   
              // localStorage.setItem('accessToken', JSON.stringify(user.token));  
              
              return user;
          }));        
  }

    }

  

 







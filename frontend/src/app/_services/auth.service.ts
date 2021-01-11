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
    ) { }  

    public getToken(): string {
        return localStorage.getItem('currentToken');
      }
    
      public readToken(): any{
        const token = localStorage.getItem('currentToken');
        return helper.decodeToken(token);
      }

      isAuthenticated(): boolean {
        const token = localStorage.getItem('currentToken');

        // if(helper.isTokenExpired(token))  {
        //     console.log("tokenExpire:", helper.isTokenExpired(token));
        //     return true;
        // }
        // else {
        //     return false;
        // }  
        
        if (token) {
          console.log('token exists');
          return true;
        } else {
          console.log('no token');
          return false;
        }
     
      }

    login(email:any, password: any){
       return this.http.post<User>(`${environment.apiUrl}/api/account/login`, {email, password})
       .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentToken', JSON.stringify(user.token));                
        console.log("localStorage:", localStorage);
        return user;
    }));        

    }   


  logout() {
    localStorage.removeItem("currentToken");
    this.router.navigate(['/login']);
  }


// getExpiration() {
//   const expiration = localStorage.getItem("expires_at");
//   const expiresAt = JSON.parse(expiration);
//   return moment(expiresAt);
// }  

    }

  

 







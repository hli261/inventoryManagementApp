import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { AccountService } from './account.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

const helper = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user: BehaviorSubject<User> =null;
  
  cachedRequests: Array<HttpRequest<any>> = [];

    constructor(
        private router: Router,
        private http: HttpClient,
        private accountService: AccountService
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
        return user;
    }));        

    }   


  logout() {
    localStorage.removeItem("currentToken");
    localStorage.clear();
    this.accountService.setTitle("");
    this.router.navigateByUrl('/login');
  }

  getLoginUser(): Observable<any>{
    if(this.readToken())
        return this.accountService.getById(this.readToken().id);
    return null;
  }

  // getLoginUser(): void{
  //   if(this.readToken())
  //   this.accountService.getById(this.readToken().id).subscribe(user => this.user.next(user));
    
  // }

  public collectFailedRequest(request: any): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
    this.router.navigate([`${this.cachedRequests[0]}`]);
  }

// getExpiration() {
//   const expiration = localStorage.getItem("expires_at");
//   const expiresAt = JSON.parse(expiration);
//   return moment(expiresAt);
// }  

    }

  

 







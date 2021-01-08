import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';


const helper = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    private loggedIn = new BehaviorSubject<boolean>(false);

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
         return this.userSubject.value;
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

    get isLoggedIn() {            
         return this.loggedIn.asObservable(); 
      }

  

 





}

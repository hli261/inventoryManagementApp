import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';

import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { EmailValidator } from "@angular/forms";
//import { cookieService } from 'ngx-cookie-service';

const BASEURL = 'http://localhost:3000/api/resetpassword';

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

    requestReset(body: any): Observable<any> {
        return this.http.post(`${BASEURL}/req-reset-password`, body);
    }

    newPassword(body:any): Observable<any> {
        return this.http.post(`${BASEURL}/new-password`, body);
      }

    ValidPasswordToken(body:any): Observable<any> {
        return this.http.post(`${BASEURL}/valid-password-token`, body);
    }

    login(email:any, password:any) {
        return this.http.post<User>(`${environment.apiUrl}/api/account/login`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));   
                localStorage.setItem('accessToken', JSON.stringify(user.token));  
                this.userSubject.next(user);  
                this.loggedIn.next(true);
                return user;
            }));        
    }

    public getAll() : Observable<User[]>{
        return this.http.get<User[]>(`${environment.apiUrl}/api/users`);
    }

    public getById(id: number): Observable<User> {
        return this.http.get<User> (`${environment.apiUrl}/api/users/${id}`);
    }

    public getByEmail(email: any) : Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/api/users/${email}`);
    }

    public register(user: User){
        return this.http.post(`${environment.apiUrl}/api/account/register`, user).subscribe();
      }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        this.userSubject.next(null);
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
    }

    update(id:any, params:any) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    // delete(id: string) {
    //     return this.http.delete(`${environment.apiUrl}/users/${id}`)
    //         .pipe(map(x => {
    //             // auto logout if the logged in user deleted their own record
    //             if (id == this.userValue.id) {
    //                 this.logout();
    //             }
    //             return x;
    //         }));
    // }
}

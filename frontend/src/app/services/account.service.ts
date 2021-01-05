import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';


import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { EmailValidator } from "@angular/forms";
//import { cookieService } from 'ngx-cookie-service';

const BASEURL = 'http://localhost:3000/api/resetpassword';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

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

    loginUser(body: any): Observable<any> {
      console.log(body);
      // return this.http.post(`${BASEURL}/login`, body);
      return this.http.post(`https://localhost:5001/api/account/login`, body);
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

    login(username:any, password:any) {
        return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }
// 分割线。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
//................................................................................








    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
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

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}

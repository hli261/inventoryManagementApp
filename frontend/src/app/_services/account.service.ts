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

@Injectable({ providedIn: 'root' })
export class AccountService {
    public user: Observable<User>;
    private userSubject: BehaviorSubject<User>;
    // private loggedIn = new BehaviorSubject<boolean>(false);

    private title = new BehaviorSubject<String>('Home');
    private title$ = this.title.asObservable();
    setTitle(title: String) {
        this.title.next(title);
    }

    getTitle(): Observable<String> {
        return this.title$;
    }
    
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

    requestReset(body: any): Observable<any> {
        return this.http.post(`${BASEURL}/req-reset-password`, body);
    }

    newPassword(body:any): Observable<any> {
        return this.http.post(`${BASEURL}/new-password`, body);
      }

    ValidPasswordToken(body:any): Observable<any> {
        return this.http.post(`${BASEURL}/valid-password-token`, body);
    } 

    public getAll() : Observable<User[]>{
        return this.http.get<User[]>(`${environment.apiUrl}/api/users`);
    }

    public getById(id: number): Observable<User> {
        return this.http.get<User> (`${environment.apiUrl}/api/users/${id}`);
    }

    public getByEmail(email: any) : Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/api/users/email/${email}`);
    }

    public register(user: User){
        return this.http.post(`${environment.apiUrl}/api/account/register`, user).subscribe();
      }  


      update(id:any, params:any) {
        return this.http.put(`${environment.apiUrl}/users/${id}`,  params);
            // .pipe(map(x => {
            //     // update stored user if the logged in user updated their own record
            //     if (id == this.userValue.id) {
            //         // update local storage
            //         const user = { ...this.userValue, ...params };
            //         localStorage.setItem('user', JSON.stringify(user));

            //         // publish updated user to subscribers
            //         this.userSubject.next(user);
            //     }
            //     return x;
            // }));
    }


    // update(id:any, params:any) {
    //     return this.http.put(`${environment.apiUrl}/users/${id}`, params)
    //         .pipe(map(x => {
    //             // update stored user if the logged in user updated their own record
    //             if (id == this.userValue.id) {
    //                 // update local storage
    //                 const user = { ...this.userValue, ...params };
    //                 localStorage.setItem('user', JSON.stringify(user));

    //                 // publish updated user to subscribers
    //                 this.userSubject.next(user);
    //             }
    //             return x;
    //         }));
    // }

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

       // login(email:any, password:any) {
    //     return this.http.post<User>(`${environment.apiUrl}/api/account/login`, { email, password })
    //         .pipe(map(user => {
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('user', JSON.stringify(user));   
    //             // localStorage.setItem('accessToken', JSON.stringify(user.token));  
    //             this.userSubject.next(user);  
    //             return user;
    //         }));        
    // }

      // logout() {
    //     // remove user from local storage and set current user to null
    //     localStorage.removeItem('user');
    //     this.userSubject.next(null);
    //     this.loggedIn.next(false);
    //     this.router.navigate(['/login']);
    // }

        //  getAuthorizationToken() {
    //     const currentUser = JSON.parse(localStorage.getItem('user'));
    //     return currentUser.token;
    //   }
}

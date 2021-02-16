import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Location } from '@angular/common';


@Injectable({ providedIn: 'root' })
export class UrlService {
    private previousUrl: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public previousUrl$: Observable<string> = this.previousUrl.asObservable();

    private history: string[] = [];
    
    constructor(
        private router: Router,
        private http: HttpClient,
        private location: Location
    ) {
        // this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        // this.user = this.userSubject.asObservable();
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                console.log("url",event.url);
              this.history.push(event.urlAfterRedirects);
              console.log("url after redirects",event.urlAfterRedirects);
            }
          })
    }


    back(): void {
        this.history.pop()
        if (this.history.length > 0) {
          this.location.back()
        } else {
          this.router.navigateByUrl('/')
        }
      }

    getUrl(){
        return this.history;
    }

    // setPreviousUrl(previousUrl: string) {
    //     this.previousUrl.next(previousUrl);
    // }

    // getPreviousUrl(): Observable<String> {
    //     return this.previousUrl$;
    // }
    
}

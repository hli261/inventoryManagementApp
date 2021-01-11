import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService, AuthService } from '../_services';
import { Router, Event, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  token: any;

  constructor(private data: AccountService, private router: Router, private authService:AuthService ) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.authService.readToken();
      }
    });
  } 

  onLogout(): void{
    this.authService.logout();
  }
 

}

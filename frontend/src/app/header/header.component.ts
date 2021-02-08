import { Component, OnInit } from '@angular/core';
import { AccountService, AuthService } from '../_services';
import { Router, Event,NavigationEnd } from '@angular/router';
import { User } from '../_models';
import { getOriginalNode } from 'typescript';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  token: any;
  title: string | any;
  email: string;
  sub!: Subscription;
  // user_: Observable<User>;
  user: User;
  

  constructor(private router: Router, 
              private authService:AuthService, 
              private headerService: AccountService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      // if (event instanceof NavigationEnd) { 
        this.token = this.authService.readToken();
      // }
    });    
    this.headerService.getTitle().subscribe(headerTitle => this.title = headerTitle);    
    this.authService.getLoginUser().subscribe(user=> this.user=user); 
    // this.user_ = this.authService.getLoginUser();
    // this.authService.getLoginUser();
    

  } 

  onLogout(): void{
    this.authService.logout();
    this.router.navigate(['login']);
  }  
 
  isBinManagement():any{    
    if(this.token) 
      return this.token.role.includes('BinManagement');
    return false;
  }

  isPutAway():any{  
    if(this.token) 
      return this.token.role.includes('PutAway');
    return false;
  }

  isReceiving():any{ 
    if(this.token) 
      return this.token.role.includes('Receiving');
    return false;
  }

  isReplenishment():any{  
    if(this.token) 
      return this.token.role.includes('Replenishment');
    return false;
  }

  isAdmin(): any {  
    if(this.token) 
      return this.token.role.includes('Admin');
    return false;
  }

}

import { Component, OnInit } from '@angular/core';
import { AccountService, AuthService, AccessService } from '../_services';
import { Router, Event, NavigationStart } from '@angular/router';
import { User } from '../_models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  token: any;
  title: string | any;
  name: string = null;
  accesses: Array<string>;
  user: User;
  

  constructor(private router: Router, 
              private authService:AuthService, 
              private headerService: AccountService,
              private accessService: AccessService ) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.authService.readToken();
      }
    });
    this.authService.getLoginUser().subscribe(user=> this.user=user);
    this.headerService.getTitle().subscribe(headerTitle => this.title = headerTitle);
  } 

  onLogout(): void{
    this.authService.logout();
  }
  
  isBinManagement():any{
    
    if (this.user) {
      this.accessService.getByEmail(this.user.email).subscribe((data: any) => this.accesses = data);     
    }
    console.log(this.accesses);   
    return this.accesses.includes('BinManagement');
  }

  isPutAway():any{
    
    if (this.user) {
      this.accessService.getByEmail(this.user.email).subscribe((data: any) => this.accesses = data);     
    }
    return this.accesses.includes('PutAway');
  }

  isReceiving():any{
    
    if (this.user) {
      this.accessService.getByEmail(this.user.email).subscribe((data: any) => this.accesses = data);     
    }
    return this.accesses.includes('Receiving');
  }

  isReplenishment():any{
    
    if (this.user) {
      this.accessService.getByEmail(this.user.email).subscribe((data: any) => this.accesses = data);     
    }
    return this.accesses.includes('Replenishment');
  }

  isAdmin(): any {
    if (this.user) {
      this.accessService.getByEmail(this.user.email).subscribe((data: any) => this.accesses = data);
    }
    return this.accesses.includes('Admin');
  }

}

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
  access: Array<string>;
  

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
    this.authService.getLoginUser().subscribe(user=> this.name=user.firstName);
    this.headerService.getTitle().subscribe(headerTitle => this.title = headerTitle);
  } 

  onLogout(): void{
    this.authService.logout();
  }

  // isAdmin(): any{
  //   if(this.user){
  //     this.accessService.getByEmail(this.user.email).subscribe((data:any) => this.access = data);
  //     return this.access.includes('Admin');
  //   }
  //   return false;
  // }
 

}

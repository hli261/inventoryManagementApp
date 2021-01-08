import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // id: number;
  email: string;
  sub!: Subscription;
  loggedIn = false;

  constructor(private data: AccountService ) { }

  ngOnInit(): void {
    console.log("user Value:", this.data.userValue);
     this.sub = this.data.isLoggedIn.subscribe((log:any)=>this.loggedIn=log);
     this.email = this.data.userValue.email;
     console.log(this.email);
    // this.loggedIn = this.data.isAuthenticated();
    // this.id = this.data.readToken().id;    
  } 

  onLogout(): void{
    this.data.logout();
  }
 

}

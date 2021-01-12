import { Component, OnInit } from '@angular/core';
import { AccountService, AuthService } from '../_services';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: Array<User>;
  pageTitle: string;
  private liveUsersSub :any;

  constructor(private data:AccountService,
              private authService: AuthService, 
              private router: Router,
              private headerService: AccountService) {

  }

  ngOnInit(): void {
    this.liveUsersSub = this.data.getAll().subscribe(data=>this.users = data); 
    console.log("read token:", this.authService.readToken());
    this.headerService.setTitle('User List');
  }

  ngOnDestroy(){
    this.liveUsersSub.unsubscribe();
  }


}

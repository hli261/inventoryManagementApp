import { Component, OnInit } from '@angular/core';
import { AccountService, AuthService } from '../_services';
import { User } from '../_models';
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
    this.liveUsersSub = this.data.getAll().subscribe(data=>{this.users = data;});
    this.headerService.setTitle('User List');
  }

  ngOnDestroy(){
    this.liveUsersSub.unsubscribe();
  }

  inactive(user: User):void{
    user.active = false;
    this.data.update(user.email, user).subscribe();
  }

  active(user: User):void{
    user.active = true;
    this.data.update(user.email, user).subscribe();
  }

}

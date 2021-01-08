import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: Array<User>;
  private liveUsersSub :any;

  constructor(private data:AccountService, private router: Router) {

  }

  ngOnInit(): void {
    this.liveUsersSub = this.data.getAll().subscribe(data=>this.users = data); 
    console.log("read token:", this.data.readToken());
  }

  ngOnDestroy(){
    this.liveUsersSub.unsubscribe();
  }


}

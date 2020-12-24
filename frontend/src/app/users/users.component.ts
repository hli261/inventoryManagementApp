import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: Array<User>;
  private liveUsersSub :any;

  constructor(private data:UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.liveUsersSub = this.data.get().subscribe(data=>this.users = data);
  }

  ngOnDestroy(){
    this.liveUsersSub.unsubscribe();
  }


}

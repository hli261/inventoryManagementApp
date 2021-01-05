import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

  user!: User;
  sub!: Subscription;

  constructor(private data: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
     this.sub = this.route.params.subscribe(param=>{
       this.data.getById(param['id']).subscribe((user:User)=>{
         this.user=user;
       })
     });
     console.log(this.user);

  }

  ngOnDestroy() {
    if(this.sub){this.sub.unsubscribe();}
 }

 addFunction(){

 }

 removeFunction(){

 }

}

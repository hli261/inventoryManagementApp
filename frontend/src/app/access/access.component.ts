import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
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
  accesses!: Array<string>;

  constructor(private data: AccountService, private route: ActivatedRoute, private router: Router) { }

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

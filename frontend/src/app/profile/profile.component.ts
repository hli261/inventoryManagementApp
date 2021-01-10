import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  sub: Subscription;
  is: boolean = false;
  id: number;
  email: string;

  constructor(private data: AccountService, private route: ActivatedRoute, private router: Router) { 
    this.id = this.route.snapshot.params['id'];
    this.email = this.route.snapshot.params['email'];
  }

  ngOnInit(): void {

    if(this.id){
      this.data.getById(this.id).subscribe(user=> this.user=user);
    }
    if(this.email){
      this.data.getByEmail(this.email).subscribe(user=> this.user=user);
    }
  //   this.sub = this.route.params.subscribe(param=>{     
  //       this.data.getById(param['id']).subscribe((user:User)=>{
  //         this.user=user;
  //       })
  //   });
  //   this.sub = this.route.params.subscribe(param=>{     
  //     this.data.getByEmail(param['email']).subscribe((user:User)=>{
  //       this.user=user;
  //     })
  // });
  }

ngOnDestroy() {
    if(this.sub){this.sub.unsubscribe();}
 }

 onSubmit(f: NgForm): void {
  if(f.value.password === f.value.password2) {
     console.log('user submit: ', this.user);     //use to test ngForm
      // this.data.update(this.user, f.value);
   }
   this.router.navigate(['/login']);
 }

}

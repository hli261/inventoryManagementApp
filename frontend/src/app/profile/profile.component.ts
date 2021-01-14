import { Component, OnInit } from '@angular/core';
import { User } from '../_models';
import { AccountService } from '../_services';
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
  pageTitle: string;

  constructor(private data: AccountService, 
              private route: ActivatedRoute, 
              private router: Router,
              private headerService: AccountService) { 
  }

  ngOnInit(): void {    
    this.sub = this.route.params.subscribe(param=>{     
        this.data.getById(param['id']).subscribe((user:User)=>{
          this.user=user;
        })
    });
    this.headerService.setTitle('User Profile');
  }

ngOnDestroy() {
    if(this.sub){this.sub.unsubscribe();}
 }

 onSubmit(f: NgForm): void {
  if(f.value.password === f.value.password2) {
      this.data.update(this.user.id, this.user)
               .subscribe((user:User)=>{
                this.user=user;
              })
   }
   this.router.navigate(['users']);
 }

}



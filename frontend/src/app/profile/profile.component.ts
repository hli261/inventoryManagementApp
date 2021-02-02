import { Component, OnInit } from '@angular/core';
import { User } from '../_models';
import { AccountService, AuthService } from '../_services';
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
  errorMessage: string;
  successMessage: string;
  password2: string;

  constructor(private data: AccountService, 
              private route: ActivatedRoute, 
              private router: Router,
              private headerService: AccountService,
              private authService: AuthService) { 
  }

  ngOnInit(): void {    
    this.sub = this.route.params.subscribe(param=>{     
        this.data.getById(param['id']).subscribe((user:User)=>{
          this.user=user;
        })
    });
    this.headerService.setTitle('User Profile');
  }

 public isAdmin(): any {
    return !(this.route.snapshot.params['id'] === this.authService.readToken().id);
  }

ngOnDestroy() {
    if(this.sub){this.sub.unsubscribe();}
 }

 onSubmit(f: NgForm): void {
  if(f.value.password !== f.value.password2) {  
    this.errorMessage= "Confirm Password does not match with password!"; 
    setTimeout(() => {
      this.errorMessage = "";
    }, 3000); 
    return;             
  }      
      this.data.update(this.user.email, this.user).subscribe(
        user=>{
          this.user = user;       
          this.successMessage = "Profile has been updated!";
          if(this.isAdmin()) {            
            setTimeout(()=>{
              this.successMessage="";
              this.router.navigate(['users']);
            }, 2000);
         }         
        else {          
          setTimeout(()=>{
            this.successMessage="";
            this.router.navigate(['']);
          }, 2000);          
        }  
        },
        error=> {
          console.log(error);
          this.errorMessage = error.error; 
          });
          setTimeout(() => {
            this.errorMessage = "";
          }, 3000);  }     
      
   
  

}



import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../_models';
import { AccountService } from '../_services';
import { Router } from '@angular/router';
import { JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  password2!: string;
  pageTitle: string;
  errorMessage!: any;

  constructor(private data:AccountService, 
              private router: Router, 
              private headerService: AccountService) { }

  ngOnInit(): void {
    this.headerService.setTitle('');
  }

 readError(err : any): void{    
 }

  onSubmit(f: NgForm): void {
    if(f.value.password == null){
      this.errorMessage = ["Password is required"];
      return;
    }
    else if(f.value.password !== f.value.password2) {  
         this.errorMessage= ["Confirm Password does not match with password!"];     
         setTimeout(() => {
          this.errorMessage = "";
        }, 3000); 
         return;         
     }      
      
      this.data.register(this.user).subscribe(
        () => this.router.navigate(['login']),        
          error=> {
          this.errorMessage = error.error.split('\n'); 
          });
          setTimeout(() => {
            this.errorMessage = "";
          }, 3000);  
      }
    }


    
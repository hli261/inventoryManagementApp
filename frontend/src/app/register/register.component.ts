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
  errorMessage!: Array<string>;
  // errors: any;

  constructor(private data:AccountService, 
              private router: Router, 
              private headerService: AccountService) { }

  ngOnInit(): void {
    this.headerService.setTitle('Register');
  }

 readError(err : any): void{
    
 }

  onSubmit(f: NgForm): void {
    if(f.value.password !== f.value.password2) {  
         this.errorMessage.push("inconsistent password!");
         return;
     }
      this.data.register(this.user).subscribe(
        () => this.router.navigate(['/login']),        
          error=> {
          // this.errors=Object.values(error.error).map((value)=>JSON.stringify(value));
           this.errorMessage = ["Passwords must be at least 6 characters.", 
                          "Passwords must have at least one digit ('0'-'9')",
                          "Passwords must have at least one lowercase ('a'-'z')",
                          "Passwords must have at least one uppercase ('A'-'Z')"
                         ]
          });
        
      }
    }


    
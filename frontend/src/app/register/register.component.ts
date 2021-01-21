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
  // errorMessage: any;
  errors: any;

  constructor(private data:AccountService, 
              private router: Router, 
              private headerService: AccountService) { }

  ngOnInit(): void {
    this.headerService.setTitle('Register');
  }



  onSubmit(f: NgForm): void {
    if(f.value.password !== f.value.password2) {  
        //  this.errorMessage.push("inconsistent password!");
         return;
     }
      this.data.register(this.user).subscribe(
        () => this.router.navigate(['/login']),
        // error => {error.error.map((data:any)=>console.log( data.description));}
        error => {this.errors= JSON.stringify(error.error); console.log(typeof error.error)}
        // error => { this.errors = Object.values(error.error);                  
        //             console.log(this.errors)}
        );
     
      }
    }
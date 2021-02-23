import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService, AuthService } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pageTitle: string;
  SigninForm=new FormGroup({});
  forbiddenEmails: any;
  errorMessage: string | any;
  active: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private headerService: AccountService
  ) { this.buildSigninForm(); }

  ngOnInit() {this.headerService.setTitle('');}

  private buildSigninForm() {
    this.SigninForm = this.fb.group({
      email: [null, [Validators.required, Validators.email], this.forbiddenEmails],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  navByActive(): void{ }

  signinUser() {
    this.authService.login(this.SigninForm.value.email, this.SigninForm.value.password).subscribe(
      data => {
           localStorage.setItem('currentToken', data.token);
           if(data.active) {
           this.router.navigate(['home'])
           .then(()=>{
            window.location.reload();
          }); 
         // this.SigninForm.reset();        
        }
       else{
         this.errorMessage = "The user is inactive";  
         setTimeout(() => {
           this.errorMessage = "";
         }, 3000);
       }       
      },
      error => {        
        if (error.message) {
          this.errorMessage = "Please input correct email or password";
        }
      }
    );
    // window.location.reload(); this.router.navigate(['./'], { relativeTo: this.route });
  }

}

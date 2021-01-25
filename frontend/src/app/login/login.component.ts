import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService, AuthService, AlertService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private headerService: AccountService
  ) { this.buildSigninForm(); }

  ngOnInit() {this.headerService.setTitle('Login');}

  private buildSigninForm() {
    this.SigninForm = this.fb.group({
      email: [null, [Validators.required, Validators.email], this.forbiddenEmails],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  signinUser() {
    this.authService.login(this.SigninForm.value.email, this.SigninForm.value.password).subscribe(
      data => {
        // localStorage.setItem('currentToken', data.token);
        this.SigninForm.reset();
        setTimeout(() => {
          this.router.navigateByUrl('/home');
        }, 1000);
      },
      error => {        
        if (error.message) {
          this.errorMessage = "Please input correct email or password";
        }
      }
    );
    //  window.location.reload();
  }

}

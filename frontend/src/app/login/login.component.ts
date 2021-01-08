import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  SigninForm=new FormGroup({});
  forbiddenEmails: any;
  errorMessage: string | any;

  constructor(
    private fb: FormBuilder,
    private authService: AccountService,
    private router: Router,
  ) { this.buildSigninForm(); }

  ngOnInit() {
  }

  private buildSigninForm() {
    this.SigninForm = this.fb.group({
      email: [null, [Validators.required, Validators.email], this.forbiddenEmails],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    this.SigninForm.reset();
  }

  signinUser() {
    this.authService.login(this.SigninForm.value.email, this.SigninForm.value.password).subscribe(
      data => {
        this.SigninForm.reset();
        setTimeout(() => {
          this.router.navigate(['home']);
        }, 1000);
      },
      err => {
        if (err.error.msg) {
          this.errorMessage = err.error.msg[0].message;
        }
        if (err.error.message) {
          this.errorMessage = err.error.message;
        }
      }
    );
  }

}

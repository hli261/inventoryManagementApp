import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AccountService, AlertService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  RequestResetForm=new FormGroup({});
  forbiddenEmails: any;
  errorMessage="";
  successMessage="";
  IsvalidForm = true;

  constructor(
    private authService: AccountService,
    private router: Router,
   ) {}

  ngOnInit() {

    this.RequestResetForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }


  RequestResetUser(form:any) {
      if (form.valid) {
      this.IsvalidForm = true;
      console.log(this.RequestResetForm.value.email);
      this.authService.requestReset(this.RequestResetForm.value.email, 'https://localhost:4200/reset-password').subscribe(
        data => {
          this.RequestResetForm.reset();
          this.successMessage = "Reset password link has been sent to email sucessfully";
          setTimeout(() => {
            this.successMessage = "";
            this.router.navigate(['login']);
          }, 5000);
        },
        err => {
          console.log(err);
          if (err) {
            this.errorMessage = "Invalid email";
            setTimeout(() => {
              this.errorMessage = "";
            }, 3000);       
          }
        }
      );
    } else {
      this.IsvalidForm = false;
    }
  }
}

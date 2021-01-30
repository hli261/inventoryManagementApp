import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountService, AlertService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  ResponseResetForm=new FormGroup({});
  errorMessage:string | any;
  successMessage:string | any;
  resetToken: null;
  email: string;
  CurrentState: any;
  IsResetFormValid = true;
  querySub: any;

  constructor(
    private authService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder ) {

    this.CurrentState = 'Wait';
    this.querySub = this.route.queryParams.subscribe(params => {
      this.resetToken = params.token;
      this.email = params.email;
      console.log(this.resetToken);
      this.authService.setTitle("Reset Password");
      // this.Verify();
    });
  }


  ngOnInit() {

    this.Init();
  }

  // Verify() {
  //   let str = `{"email": "${this.email}"}`;
  //   this.authService.ValidEmail(str).subscribe(
  //     (data:any) => {
  //       this.CurrentState = 'Verified';
  //     },
  //     (err:any) => {
  //       console.log("err msg:",err);
  //       this.CurrentState = 'NotVerified';
  //     }
  //   );
  // }

  Init() {
    this.ResponseResetForm = this.fb.group(
      {
        token: [this.resetToken],
        email: [this.email],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
      }
    );
  }

  Validate(passwordFormGroup: FormGroup) {
    const new_password = passwordFormGroup.controls.password.value;
    const confirm_password = passwordFormGroup.controls.confirmPassword.value;

    if (confirm_password.length <= 0) {
      return null;
    }

    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true
      };
    }

    return null;
  }


  ResetPassword(form:any) {
    if (form.valid) {
      console.log("form value:",this.ResponseResetForm.value);
      this.IsResetFormValid = true;
      this.authService.newPassword(this.ResponseResetForm.value).subscribe(
        (data:any) => {
          // this.ResponseResetForm.reset();
          this.successMessage = "Your password has been reset successfully";
          setTimeout(() => {
            this.successMessage = "";
            this.router.navigate(['login']);
          }, 3000);
        },
        (err:any) => {        
          if (err.error.errors) {
            this.errorMessage = err.error.errors;            
          }
        }
      );
    } else { this.IsResetFormValid = false; }
  }
}



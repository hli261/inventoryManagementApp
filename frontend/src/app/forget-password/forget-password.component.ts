// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
// import { AccountService, AlertService } from '../_services';
// import { Router } from '@angular/router';
// import { first } from 'rxjs/operators';

// @Component({
//   selector: 'app-forget-password',
//   templateUrl: './forget-password.component.html',
//   styleUrls: ['./forget-password.component.css']
// })
// export class ForgetPasswordComponent implements OnInit {
//   insertForm = new FormGroup({ });
//   Email = new FormControl({});
//   loading = false;

//   constructor(
//     private router: Router,
//     private acct: AccountService,
//     private fb: FormBuilder,
//     private alertService: AlertService) { }

//   ngOnInit(): void {
//     //Initialize Conrols
//     this.Email = new FormControl('',[Validators.required, Validators.email]);

//     this.insertForm = this.fb.group({
//       Email: this.Email
//     });
//   }

//   onSubmit() {
//     let userInfo = this.insertForm.value;
//     this.acct.sendForgotPasswordEmail(userInfo.Eamil).subscribe((result) => {
//       if (result && result.message =='Success'){
//         $('#forgotPassCard').html('');
//         $('#forgotPassCard').append(
//           "<div class='alert alert-success show'>" +
//           '<strong>Success!</strong> Please check your email for password reset instructions.' +
//           '</div>'
//         );
//       }
//     },
//     error => {
//       this.alertService.error(error);
//       this.loading = false;
//     },
//     )}
// }


import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AccountService, AlertService } from '../services';
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
    console.log(form)
    if (form.valid) {
      this.IsvalidForm = true;
      this.authService.requestReset(this.RequestResetForm.value).subscribe(
        data => {
          this.RequestResetForm.reset();
          this.successMessage = "Reset password link send to email sucessfully.";
          setTimeout(() => {
            this.successMessage = "";
            this.router.navigate(['login']);
          }, 3000);
        },
        err => {

          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
      );
    } else {
      this.IsvalidForm = false;
    }
  }
}

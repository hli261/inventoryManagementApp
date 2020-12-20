import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { $ } from 'protractor';
// import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  insertForm!: FormGroup;
  Email!: FormControl;

  //constructor(private acct: AccountService, private fb: FormBuilder) { }

  ngOnInit(): void {
    //Initialize Conrols
    this.Email = new FormControl('',[Validators.required, Validators.email]);

    // this.insertForm = this.fb.group({
    //   Email: this.Email
    // });
  }

  // onSubmit(): {
  //   let userInfo = this.insertForm.value;
  //   this.acct.sendForgotPasswordEmail(userInfo.Eamil).subscribe((result) => {
  //     if (result && result.message =='Success'){
  //       $('#forgotPassCard').html('');
  //       $('#forgotPassCard').append(
  //         "<div class='alert alert-success show'>" + 
  //         '<strong>Success!</strong> Please check your email for password reset instructions.' +
  //         '</div>'
  //       );
  //     }
  //   });
  //}
}

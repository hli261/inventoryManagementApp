import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  user: User = new User();
  password2!: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    console.log('submit', f.value);
  }
}

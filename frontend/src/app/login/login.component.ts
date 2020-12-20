import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  password2!: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    console.log('submit', f.value);
  }

}

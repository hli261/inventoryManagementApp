import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  password2!: string;

  constructor() { }

  ngOnInit(): void {     
  
  }

  onSubmit(f: NgForm): void {
     console.log('submit', f.value);
   }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  password2!: string;

  constructor(private data:UserService, private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(f: NgForm): void {
    if(f.value.password === f.value.password2) {
       console.log('user submit: ', this.user);     //use to test ngForm
        this.data.add(this.user);
     }
     this.router.navigate(['/login']);
   }

}

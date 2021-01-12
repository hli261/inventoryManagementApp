import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  password2!: string;
  pageTitle: string;
  errorMessage!: string;

  constructor(private data:AccountService, 
              private router: Router, 
              private headerService: AccountService) { }

  ngOnInit(): void {
    this.headerService.setTitle('Register');
  }

  onSubmit(f: NgForm): void {
    if(f.value.password !== f.value.password2) {  
         this.errorMessage = "inconsistent password!";
         return;
     }
      this.data.register(this.user);
      this.router.navigate(['/login']);     
   }

}

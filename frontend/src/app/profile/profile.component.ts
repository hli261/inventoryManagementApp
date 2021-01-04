import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: User;
  sub!: Subscription;
  isAdmin: boolean = false;

  constructor(private data: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(param=>{
      this.data.getById(param['id']).subscribe((user:User)=>{
        this.user=user;
        console.log(this.user);
      })
    });

    // if(this.user.access.forEach(fn=>{if(fn ==="admin") isAdmin = true;});
  }

ngOnDestroy() {
    if(this.sub){this.sub.unsubscribe();}
 }

 onSubmit(f: NgForm): void {
  if(f.value.password === f.value.password2) {
     console.log('user submit: ', this.user);     //use to test ngForm
      this.data.add(this.user);
   }
   this.router.navigate(['/login']);
 }

}

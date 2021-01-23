import { Component, OnInit } from '@angular/core';
import { User } from '../_models';
import { AccessService, AccountService } from '../_services';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

  email: string;
  sub!: Subscription;
  accesses!: Array<string>;  
  pageTitle: string;

  constructor(private accessService: AccessService, 
              private route: ActivatedRoute, 
              private router: Router,
              private headerService: AccountService) { 
        this.email = this.route.snapshot.params['email'];
              }

  ngOnInit(): void {
     this.sub = this.route.params.subscribe(param=>{
       this.accessService.getByEmail(param['email']).subscribe((data: any)=>{
         this.accesses=data;
       })
     });
   this.headerService.setTitle('User Access Authorization');
  }

  ngOnDestroy() {
    if(this.sub){this.sub.unsubscribe();}
 }

 addFunction(access: string){
      this.accesses.push(access);
      this.accessService.update(this.email, this.accesses);
      // this.router.navigate['./', ];
 }

 removeFunction(access: string){
       
 }

}

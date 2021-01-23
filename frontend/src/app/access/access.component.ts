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
  functions: Array<string> = [
         "Admin", "PutAway" , "BinManagement" , "Receiving", "Replenishment"        
  ]

  constructor(private accessService: AccessService, 
              private route: ActivatedRoute, 
              private router: Router,
              private headerService: AccountService) { 
        this.email = this.route.snapshot.params['email'];
              }

  ngOnInit(): void {
     this.sub = this.route.params.subscribe(param=>{
       this.accessService.getByEmail(this.email).subscribe((data: any)=>{
         this.accesses=data;
         console.log(data);
       })
     });
   this.headerService.setTitle('User Access Authorization');
  }

  ngOnDestroy() {
    if(this.sub){this.sub.unsubscribe();}
 }

 hasAccess(func: any){
    return this.accesses.includes(func);
 }

 addFunction(access: string){
      this.accessService.update(this.email, access);
      // this.router.navigateByUrl('./');
 }

 removeFunction(access: string){
       console.log('remove access:',access);
      this.router.navigate(['./.']);
 }



}

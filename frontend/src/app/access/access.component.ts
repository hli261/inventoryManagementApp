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
   if(this.accesses)   return this.accesses.includes(func);
    return false;
 }

 addFunction(access: string){
      let role = `{"role": "${access}"}`;    
      this.accessService.addAccess(this.email, JSON.parse(role)).subscribe(
        (data: any) => this.accesses = data,
        err => console.log(err)
      )
 }

 removeFunction(access: string){
    console.log("delete access:", access);
     let role = `{"role": "${access}"}`;    
     this.accessService.deleteAccess(this.email, JSON.parse(role)).subscribe(
        // (data: any) => this.accesses = data,
        //  err => console.log("err message:",err)
  )
      // this.router.navigate(['./.']);
 }



}

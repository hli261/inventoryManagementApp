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

  user!: User;
  sub!: Subscription;
  accesses!: Array<string>;  
  pageTitle: string;

  constructor(private accessService: AccessService, 
              private route: ActivatedRoute, 
              private router: Router,
              private headerService: AccountService) { }

  ngOnInit(): void {
    //  this.sub = this.route.params.subscribe(param=>{
    //    this.accessService.get(param['id']).subscribe((data: any)=>{
    //      this.accesses=data;
    //    })
    //  });
    //  console.log(this.accesses);
    this.headerService.setTitle('User Access Authorization');

  }

  ngOnDestroy() {
    if(this.sub){this.sub.unsubscribe();}
 }

 addFunction(){

 }

 removeFunction(){

 }

}

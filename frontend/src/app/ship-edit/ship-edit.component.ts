import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShipCreate } from '../_models';
import { AccountService,  ReceivingService, UrlService } from '../_services';

@Component({
  selector: 'app-ship-edit',
  templateUrl: './ship-edit.component.html',
  styleUrls: ['./ship-edit.component.css']
})
export class ShipEditComponent implements OnInit {

  ship: ShipCreate;
  sub: Subscription;
  pageTitle: string;
  errorMessage: string;
  successMessage: string;
  shipNum: string;
  shipMethod: Array<any>;

  constructor(private data: ReceivingService, 
              private route: ActivatedRoute, 
              private router: Router,
              private headerService: AccountService,
              private urlService: UrlService) { 
                this.shipNum = this.route.snapshot.params['shipNum'];
                console.log(this.shipNum)
  }

  ngOnInit(): void {    
    this.sub = this.data.getShipByNum(this.shipNum).subscribe((data: any)=>{
          this.ship = data;
        });
    
    this.sub = this.data.getShippingMethod().subscribe(data=> this.shipMethod =data);
    this.headerService.setTitle('Update Ship');
  }

 
ngOnDestroy() {
    if(this.sub){this.sub.unsubscribe();}
 }

 onSubmit(f: NgForm): void {     
      this.data.updateShip(this.shipNum, this.ship).subscribe(
        (data) =>{
          this.ship = data;       
          this.successMessage = "Shipping record has been updated!";
          setTimeout(()=>{
            this.successMessage="";
            this.router.navigate(['']);
          }, 2000);                
        },
        error=> {
          console.log(error);
          this.errorMessage = error.error; 
          });
          setTimeout(() => {
            this.errorMessage = "";
          }, 3000);  }           
   

}

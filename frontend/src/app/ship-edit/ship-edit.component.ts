import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Ship, ShipCreate } from '../_models';
import { AccountService,  ReceivingService, UrlService } from '../_services';

@Component({
  selector: 'app-ship-edit',
  templateUrl: './ship-edit.component.html',
  styleUrls: ['./ship-edit.component.css']
})
export class ShipEditComponent implements OnInit {

  ship: Ship;
  updateShip: ShipCreate = new ShipCreate();
  sub: Subscription;
  pageTitle: string;
  errorMessage: string;
  successMessage: string;
  shipNum: string;
  shipMethod: Array<any>;
  previousUrl_: Observable<string>;

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
          this.ship = data;  console.log(this.ship);
          this.mapperShip();
        });    
    this.sub = this.data.getShippingMethod().subscribe(data=> this.shipMethod =data);
    this.headerService.setTitle('Update Ship');
    this.previousUrl_= this.urlService.previousUrl$;
  }

 
ngOnDestroy() {
    if(this.sub){this.sub.unsubscribe();}
 }

 back(url: any): void {
  this.router.navigateByUrl(`${url}`);
}

 mapperShip() {
   this.updateShip.arrivalDate = this.ship.arrivalDate.toString();
   this.updateShip.logisticName = this.ship.shippingMethod.logisticName;
   this.updateShip.venderNo = this.ship.vender.venderNo;   
   this.updateShip.userEmail = this.ship.user.email;
   this.updateShip.invoiceNumber = this.ship.invoiceNumber;
   this.updateShip.poNumber = this.ship.poNumber;
 }

 onSubmit(f: NgForm): void {     
   console.log(this.updateShip);
      this.data.updateShip(this.shipNum, this.updateShip).subscribe(
        (data) =>{   
          this.successMessage = "Shipping record has been updated!";
          setTimeout(()=>{
            this.successMessage="";
            // this.router.navigate(['']);
          }, 3000);                
        },
        error=> {
          console.log(error);
          this.errorMessage = error.error; 
          });
          setTimeout(() => {
            this.errorMessage = "";
          }, 3000);  }           
   

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Ship, ShipCreate, ShipMethod, User } from '../_models';
import { ReceivingService, AccountService, AuthService } from '../_services';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnInit {

  ship: ShipCreate = new ShipCreate();
  shipMethod: Array<any>;
  model: NgbDateStruct;
  sub: Subscription;
  shipForm: any;
  errorMessage: string;
  user: User;
  otherMethod: ShipMethod = new ShipMethod();
  visible: boolean = false;

  
  private buildForm() {
    this.shipForm = this.fb.group({
      arrivalDate: [null, [Validators.required]],
      shipType: [null, [Validators.required]],
      venderNo: [null, [Validators.required, Validators.minLength(6)]],
      invoiceNo: [null], 
      logisticName: [null]
    });
  }

  constructor(private data: ReceivingService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private headerService: AccountService,
              private authService: AuthService) { 
                this.buildForm();
              }


  ngOnInit(): void {
      
    this.sub = this.authService.getLoginUser().subscribe(user=> this.user=user);     
    this.sub = this.data.getShippingMethod().subscribe(data=> this.shipMethod =data);
    this.headerService.setTitle('Create Ship Record');
    
  }

  ngOnDestroy(){
    if(this.sub)
      this.sub.unsubscribe();
  }

  // addShipMethod() {
  //   console.log("test other");
  //   if(this.shipForm.value.shipType === "other"){
  //      this.visible = true;
  //   }
  // }

  check(event:any) {    
    console.log(event.target, event.target.value );
    //  if(event.target.checked) {
    //      this.shipForm.value.shipType = type;
    //  }
    //  if(!event.target.checked) {
    //   this.shipForm.value.shipType = "";
    //  }
          
  }

  otherChecked(event: any){
    if(event.target.value === "other") {
      this.shipForm.value.shipType = event.target.value;
    }
  }
  
 validate(){
  if(!this.shipForm.value.arrivalDate) {
    this.errorMessage = "Arrival Date is required";
    return;
   }
   if(!this.shipForm.value.shipType) {
     this.errorMessage = "Ship Type is required";
     return;
    }
    if(this.shipForm.value.shipType === "other" && !this.shipForm.value.logisticName) {
      this.errorMessage = "Please fill in the other ship type";
      return;
    }
    if(!this.shipForm.value.venderNo) {
      this.errorMessage = "Vender Number is required";
      return;
    }
   
 }

 createMethod(): any {
   if(this.shipForm.value.logisticName){
     this.otherMethod.logisticName = this.shipForm.value.logisticName;
     this.sub = this.data.addShipMethod(this.otherMethod).subscribe(
      ()=>{ console.log("logistic method created")
        return true;},
      err => {
        console.log(err);
        return false;
      }
    );
   }
   return false;
 }


 setShipValue(){
   this.ship.arrivalDate = `${this.shipForm.value.arrivalDate.year}-${this.shipForm.value.arrivalDate.month}-${this.shipForm.value.arrivalDate.day}`;
   this.ship.logisticName = this.shipForm.value.shipType;
   this.ship.userEmail = this.authService.readToken().nameid;
   this.ship.venderNo = this.shipForm.value.venderNo;
   this.ship.invoiceNumber = this.shipForm.value.invoiceNo || "";
 }

  onSubmit() {
       console.log('ship submit: ', this.shipForm.value);  
       console.log(new Date(`${this.ship.arrivalDate}`))   //use to test ngForm
        this.validate();
        console.log("after validate");
        if(this.shipForm.value.shipType === "other"){
            if(!this.createMethod()) {
              this.errorMessage = "Shipping method can not be created!"
              return;
            }
        }
        console.log("after create method");
        this.setShipValue();
        console.log(this.ship);
        this.sub = this.data.addShip(this.ship).subscribe(
          (data)=>{
             console.log("success", data);
             this.router.navigate(['ship-detail', data.shippingNumber]);
          },
          err =>{
            console.log(err);
          }
        );


      
   }

}

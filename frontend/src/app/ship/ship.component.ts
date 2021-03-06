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
  shipMethod_: Observable<any>;
  model: NgbDateStruct;
  sub: Subscription;
  shipForm: any;
  errorMessage: string;
  successMessage: string;
  user: User;
  otherMethod: ShipMethod = new ShipMethod();
  visible: boolean = false;

  
  private buildForm() {
    this.shipForm = this.fb.group({
      arrivalDate: [null, [Validators.required]],
      shipType: [null, [Validators.required]],
      venderNo: [null, [Validators.required, Validators.minLength(6)]],
      invoiceNo: [null], 
      logisticName: [null],
      poNo: [null]
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
    // this.shipMethod_=this.data.getShippingMethod().pipe(take(5));
    // this.sub = this.shipMethod_.subscribe(data=> {this.shipMethod =data.slice(0,5)})
    this.headerService.setTitle('Create Ship Record');
    
  }

  ngOnDestroy(){
    if(this.sub)
      this.sub.unsubscribe();
  }


  otherChecked(event: any){
    if(event.target.value === "other") {
      this.visible = true;
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
    if(!this.shipForm.value.poNo) {
      this.errorMessage = "PO Number is required";
      return;
    }
   
 }

 createMethod(): any {
   let res = false;
   if(this.shipForm.value.logisticName){
     this.otherMethod.logisticName = this.shipForm.value.logisticName;
     this.sub = this.data.addShipMethod(this.otherMethod).subscribe(
      ()=>{
        return true;},
      err => {
        console.log(err);
        return false;
      }
    );
   }
 }


 setShipValue(){
   this.ship.arrivalDate = `${this.shipForm.value.arrivalDate.year}-${this.shipForm.value.arrivalDate.month}-${this.shipForm.value.arrivalDate.day}`;
   this.ship.logisticName = this.shipForm.value.shipType === "other" ? this.shipForm.value.logisticName : this.shipForm.value.shipType;
   this.ship.userEmail = this.authService.readToken().nameid;
   this.ship.venderNo = this.shipForm.value.venderNo;
   this.ship.invoiceNumber = this.shipForm.value.invoiceNo || "";
   this.ship.poNumber = this.shipForm.value.poNo;
 }

  onSubmit() {
       console.log('ship submit: ', this.shipForm.value);
       this.validate();
        console.log(this.shipForm.value.shipType);
        if(this.shipForm.value.shipType === "other"){
          console.log(this.createMethod());
            if(this.createMethod()== false) {
              this.errorMessage = "Shipping method can not be created!";
              setTimeout(() => {
                this.errorMessage = "";
               }, 2000);
              return;
            }
        }
        this.setShipValue();
        console.log(this.ship);
        this.sub = this.data.addShip(this.ship).subscribe(
          (data)=>{
             this.successMessage = "Ship record created!";
             setTimeout(() => {
               this.successMessage = "";
              }, 3000);
              this.router.navigate(['ship-detail', data.shippingNumber]);
          },
          err =>{
            console.log(err);
            this.errorMessage= err;
          }         
        );
        setTimeout(() => {
          this.errorMessage = "";
        }, 3000);
      
   }

}

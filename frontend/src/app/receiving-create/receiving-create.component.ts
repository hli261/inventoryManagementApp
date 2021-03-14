import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReceiveOrder, ReceivingCreate, Ro } from '../_models';
import { ReceivingService } from '../_services/receiving.service';

// const navigationExtras: NavigationExtras = {
//   state: {
//     transd: 'TRANS001',
//     workQueue: false,
//     services: 10,
//     code: '003'
//   }
// };

@Component({
  selector: 'app-receiving-create',
  templateUrl: './receiving-create.component.html',
  styleUrls: ['./receiving-create.component.css']
})
export class ReceivingCreateComponent implements OnInit {

  receiving: ReceivingCreate;
  receiveForm = new FormGroup({});
  errorMessage: any;
  successMessage: any;
  tempRO = new Ro();
  newRO : ReceiveOrder;
  sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private data: ReceivingService,
    private router: Router
  ) { this.buildForm(); }

  private buildForm() {
    this.receiveForm = this.fb.group({
      PONumber: [null],
      venderNo: [null],
      shippingNumber: [null]
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.receiveForm.value.PONumber == null || this.receiveForm.value.venderNo == null || this.receiveForm.value.shippingNumber == null) {
      this.errorMessage = "Each option above must be filled in!"
      return;
    }
    this.data.getCreate(this.receiveForm.value.PONumber, this.receiveForm.value.venderNo, this.receiveForm.value.shippingNumber)
      .subscribe((data2: ReceivingCreate) => {
        this.receiving = data2;        
        this.successMessage = "loading the data successfully!";
        console.log("start creatRO");
        this.createRO();
        this.sub=this.data.createRO(this.tempRO).subscribe((data)=>{
          this.newRO = data;
          console.log(this.newRO);
        })
        setTimeout(() => {
          this.successMessage = "";
          // this.router.navigate(['order'], {state: this.receiving});
          this.router.navigate(['order'], {state: this.newRO});
        }, 2000);
      },
        error => {
          this.errorMessage = error;
          setTimeout(() => {
            this.errorMessage = "";
          }, 2000);
        }
      )
  }

  public createRO() {
    this.tempRO.poNumber = this.receiveForm.value.PONumber;
    this.tempRO.shippingNumber = this.receiveForm.value.shippingNumber;
    this.tempRO.venderNo = this.receiveForm.value.venderNo;   
    this.tempRO.lotNumber ="",
    this.tempRO.userEmail ="",
    this.tempRO.arrivalDate= "2021-03-12",
    this.tempRO.status = "DRAFT",
    this.tempRO.orderDate = "2021-03-12",
    this.tempRO.rOitems=  [
    {
      "lotNumber": "string",
      "itemNumber": "string",
      "itemDescription": "string",
      "orderQty": 0,
      "receiveQty": 0,
      "diffQty": 0,
      "expireDate": "2021-03-12T04:32:26.116Z"
    }
  ] 

  }

}

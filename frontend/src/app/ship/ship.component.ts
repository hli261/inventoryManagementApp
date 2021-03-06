import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Ship } from '../_models';
import { ShipService, AccountService } from '../_services';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnInit {

  ship: Ship;
  shipMethod: Array<any>;
  model!: NgbDateStruct;
  sub!: Subscription;
  shipForm: any;
  errorMessage: string;
  visible: boolean =false; 

  // shipForm = this.fb.group({
  //   arrivalDate: [''],
  //   shipType: [''],
  //   venderNo: [''],
  //   invoiceNo: ['']
  // });

  private buildForm() {
    this.shipForm = this.fb.group({
      arrivalDate: [null, [Validators.required]],
      shipType: [null, [Validators.required]],
      venderNo: [null, [Validators.required, Validators.minLength(6)]],
      invoiceNo: [null], 
      otherMethod: [null]
    });
  }

  constructor(private data: ShipService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private headerService: AccountService) { 
                this.buildForm();
                this.ship.arrivalDate = new Date();
              }


  ngOnInit(): void {
    // this.sub = this.route.params.subscribe(param=>{
    //   this.data.getById(param['id']).subscribe((ship:Ship)=>{
    //      this.ship=ship;
    //   })
    // })

    this.sub=this.data.getShippingMethod().subscribe(data=> this.shipMethod =data );
    this.headerService.setTitle('Ship information');
   
  }

  addShipMethod() {
    console.log("test other");
    if(this.shipForm.value.shipType === "other"){
       this.visible = true;
    }
  }
  


  onSubmit() {
       console.log('ship submit: ', this.shipForm.value);     //use to test ngForm
        

      // this.router.navigate(['/ships']);
   }

}

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

  ship!: Ship;
  shipMethod: Array<any>;
  model!: NgbDateStruct;
  sub!: Subscription;
  pageTitle: string;
  shipForm: any;
  errorMessage: string;

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
      invoiceNo: [null] 
    });
  }

  constructor(private data: ShipService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private headerService: AccountService) { 
                this.buildForm();
              }


  ngOnInit(): void {
    // this.sub = this.route.params.subscribe(param=>{
    //   this.data.getById(param['id']).subscribe((ship:Ship)=>{
    //      this.ship=ship;
    //   })
    // })

    this.sub=this.data.getShippingMethod().subscribe(data=> {this.shipMethod =data; console.log(this.shipMethod);});

    this.headerService.setTitle('Ship information');
  }

 


  onSubmit() {
       console.log('ship submit: ', this.shipForm.value);     //use to test ngForm
        this.data.add(this.ship);

      this.router.navigate(['/ships']);
   }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Ship } from '../_models/ship';
import { ShipService } from '../_services/ship.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnInit {

  ship!: Ship;
  model!: NgbDateStruct;
  sub!: Subscription;

  shipForm = this.fb.group({
    arrivalDate: [''],
    shipType: [''],
    parcels: this.fb.array([this.fb.group({
      poNum: '',
      venderNum: '',
      lotNum: ''
    })])
  });

  constructor(private data: ShipService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }


  ngOnInit(): void {
    this.sub = this.route.params.subscribe(param=>{
      this.data.getById(param['id']).subscribe((ship:Ship)=>{
         this.ship=ship;
      })
    })
  }

  get parcels() {
    return this.shipForm.get('parcels') as FormArray;
  }

  addParcel() {
    this.parcels.push(this.fb.group({
      poNum: '',
      venderNum: '',
      lotNum: ''
    }));
  }

  removeParcel(i:any){
   this.parcels.removeAt(i);
  }

  onSubmit() {
       console.log('ship submit: ', this.shipForm.value);     //use to test ngForm
        this.data.add(this.ship);

     this.router.navigate(['/ships']);
   }

}

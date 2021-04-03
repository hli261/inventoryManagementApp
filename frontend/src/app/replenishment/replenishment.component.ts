import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PutAwayItem } from '../_models';

@Component({
  selector: 'app-replenishment',
  templateUrl: './replenishment.component.html',
  styleUrls: ['./replenishment.component.css']
})
export class ReplenishmentComponent implements OnInit {

  item: PutAwayItem = new PutAwayItem();
  successMessage: string;
  errorMessage: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){

  }

}

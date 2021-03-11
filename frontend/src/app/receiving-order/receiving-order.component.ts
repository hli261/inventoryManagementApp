import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoItem } from '../_models';
import { ReceivingService } from '../_services';

@Component({
  selector: 'app-receiving-order',
  templateUrl: './receiving-order.component.html',
  styleUrls: ['./receiving-order.component.css']
})
export class ReceivingOrderComponent implements OnInit {

  roItems: Array<RoItem>;
  state: any;
  sub: Subscription;

  constructor(private router: Router, private data : ReceivingService) {     
     this.state = this.router.getCurrentNavigation().extras.state;
  console.log("ro-----", this.state);
  }

  ngOnInit(): void {
    console.log(this.state);
    this.sub=this.data.loadPO("39389", "SP0074","SN0000431").subscribe((data)=>{
      console.log("load PO");
      this.roItems = data; console.log(this.roItems);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReceiveOrder, RoItem } from '../_models';
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
  roNum: string;
  successMessage: string;
  errorMessage: string;

  constructor(private router: Router, 
              private data : ReceivingService,
              private route : ActivatedRoute) {     
     this.state = this.router.getCurrentNavigation().extras.state;
     console.log("ro-----", this.state);
  }

  ngOnInit(): void {
    console.log(this.state);
    if(this.state) {
      this.roItems = this.state.getReceivingItemDtos;
      this.roNum = this.state.roNumber;
    }
    console.log(window.location);
    if(window.location.pathname.includes("/order-edit/") ){
      this.roNum = this.route.snapshot.params['roNum']
      this.sub = this.data.getROItemsByRONum(this.roNum).subscribe((data)=>{
        this.roItems = data;
        console.log(this.roItems);
      })
    }
   
  }

  onChange(item:any): void{
    console.log(item);
      item.diffQty = item.orderQty-item.receiveQty;      
  }

  save(): void{
     this.sub = this.data.updateROItems(this.roNum, this.roItems).subscribe((data)=>{
       this.roItems = data;
       this.successMessage = "Order has been saved!"
       console.log(this.roItems);
     },
     err =>
      console.log(err)
     )
  }

  submit(): void{

  }

}

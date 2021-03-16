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
  // roItems: any;
  state: any;
  sub: Subscription;
  roNum: string;
  successMessage: string;
  errorMessage: string;
  ro: ReceiveOrder;

  constructor(private router: Router, 
              private data : ReceivingService,
              private route : ActivatedRoute) {     
     this.state = this.router.getCurrentNavigation().extras.state;
     console.log("ro-----", this.state);
  }

  ngOnInit(): void {
    if(this.state) {
      this.roItems = this.state.getReceivingItemDtos;
      this.roNum = this.state.roNumber;
    }
    
    if(window.location.pathname.includes("/order-edit/") ){
      this.roNum = this.route.snapshot.params['roNum'];
      this.sub = this.data.getROItemsByRONum(this.roNum).subscribe((data)=>{
        this.roItems = data;
        console.log(this.roItems);
      })
      this.sub = this.data.getROByRONum(this.roNum).subscribe((data)=>{
        this.ro = data;
        console.log(this.ro);
      })
    }
  }

  onChange(item:any): void{
    console.log(item);
      item.diffQty = item.orderQty-item.receiveQty;   
  }

  save(): void{
    console.log("this.roitems:....", this.roItems);
      this.sub = this.data.updateROItems(this.roNum, this.roItems).subscribe((data)=>{
        this.roItems = data;
        this.successMessage = "Order has been saved!"
        console.log(this.roItems);
      },
      err =>
       console.log("this is an error:" , err)
      )
  }

  submit(): void{
    this.ro.status = "SUMMIT";
    this.sub = this.data.submitRO(this.ro).subscribe((data)=>{
      this.ro = data;
      this.successMessage = "Order has been submitted!"
      console.log(this.ro);
    },
    err =>
     console.log("this is an error:" , err)
    )
  }

  return(): void{
    this.router.navigate(['orders']);
  }

}

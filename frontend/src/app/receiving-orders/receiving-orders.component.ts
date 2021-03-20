import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ReceiveOrder } from '../_models';
import { ReceivingService } from '../_services';

@Component({
  selector: 'app-receiving-orders',
  templateUrl: './receiving-orders.component.html',
  styleUrls: ['./receiving-orders.component.css']
})
export class ReceivingOrdersComponent implements OnInit {

  orders_: Observable<ReceiveOrder[]>;
  page: number = 1;
  errorMessage: string;
  pageSize: number = 10;
  sub: Subscription;
  searchInput: string;
  selector: string ="roNum";
  searchResult: ReceiveOrder;
  

  constructor(private data: ReceivingService) { }

  ngOnInit(): void {
    this.getPage(this.page);
  }

  getPage(num: number): void {
    this.page = num;
    this.orders_ = this.data.getAllRO(num, this.pageSize);
  }

  selectKey($event : any) : void {
    this.selector = $event.target.value;
    console.log(this.selector);
  }

  onSubmit(): void {
     if(this.selector === "roNum"){
       this.sub = this.data.getROByRONum(this.searchInput).subscribe((data)=> this.searchResult = data);
     }


  }


}

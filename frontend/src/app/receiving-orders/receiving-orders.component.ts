import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  

  constructor(private data: ReceivingService) { }

  ngOnInit(): void {
    this.getPage(this.page);
  }

  getPage(num: number): void{
    this.page = num;
    this.orders_ = this.data.getAllRO(num, this.pageSize);
  }

}

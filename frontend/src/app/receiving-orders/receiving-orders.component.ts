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
  

  constructor(private data: ReceivingService) { }

  ngOnInit(): void {
    this.orders_ = this.data.getAllRO();
  }

  getPage(event:any): void{

  }

}

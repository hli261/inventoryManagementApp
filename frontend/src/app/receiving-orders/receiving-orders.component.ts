import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReceiveOrder } from '../_models';

@Component({
  selector: 'app-receiving-orders',
  templateUrl: './receiving-orders.component.html',
  styleUrls: ['./receiving-orders.component.css']
})
export class ReceivingOrdersComponent implements OnInit {

  receiveOrders_: Observable<ReceiveOrder[]>;
  

  constructor() { }

  ngOnInit(): void {
  }

}

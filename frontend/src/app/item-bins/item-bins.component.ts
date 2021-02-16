import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BinItem } from '../_models';

@Component({
  selector: 'app-item-bins',
  templateUrl: './item-bins.component.html',
  styleUrls: ['./item-bins.component.css']
})
export class ItemBinsComponent implements OnInit {

  @Input() binItem_: Observable<BinItem[]>;

  constructor() { }

  ngOnInit(): void {
  }

}

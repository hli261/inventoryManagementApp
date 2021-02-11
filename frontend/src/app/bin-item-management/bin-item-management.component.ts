import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bin, BinItem } from '../_models';
import { AccountService } from '../_services';

@Component({
  selector: 'app-bin-item-management',
  templateUrl: './bin-item-management.component.html',
  styleUrls: ['./bin-item-management.component.css']
})
export class BinItemManagementComponent implements OnInit {

  bins_: Observable<Bin[]>;
  items_: Observable<BinItem[]>;

  constructor(private headService : AccountService) { }

  ngOnInit(): void {
    this.headService.setTitle("Bin-Item Management");   
  }

  selectKey($event: any): void{

  }

}

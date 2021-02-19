import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Bin, BinItem } from '../_models';
import { BinService } from '../_services';

@Component({
  selector: 'app-item-bins',
  templateUrl: './item-bins.component.html',
  styleUrls: ['./item-bins.component.css']
})
export class ItemBinsComponent implements OnInit {

  @Input() binItem_: Observable<BinItem[]>;
  data: Bin;
  sub: Subscription;

  constructor(private binService: BinService) { }

  ngOnInit(): void {    
  }

  showDetail(binCode: string):void{
    console.log("mouse enter");
    this.sub= this.binService.getByBinCode(binCode).subscribe(data=>this.data=data);
  }

  closeDetail(){
    this.data = null;
  }
}

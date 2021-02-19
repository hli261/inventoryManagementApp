import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BinService, UrlService } from '../_services';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Bin, BinItem, Item } from '../_models';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bin-items',
  templateUrl: './bin-items.component.html',
  styleUrls: ['./bin-items.component.css']
})
export class BinItemsComponent implements OnInit {

  @Input() binItem_: Observable<BinItem[]>;
  code: string;
  page: number=1;
  displayTitle: boolean =false;
  previousUrl_: Observable<string>;
  bin: Bin;
  subQuery: Subscription;
  item: Item;

  constructor(private binService: BinService, private route: ActivatedRoute, private router: Router, 
    private urlService: UrlService) { 
    this.code = this.route.snapshot.params['binCode'];
  }

  ngOnInit(): void {
    if(!(this.binItem_)){
      this.getPage(this.page);
      this.displayTitle = true;
    }
    this.previousUrl_= this.urlService.previousUrl$;
    this.subQuery = this.binService.getByBinCode(this.code).subscribe(data=>this.bin=data);
  }

  ngOnDestory():void{
    if(this.subQuery)
       this.subQuery.unsubscribe();
  }

  getPage(num: any): void {
    this.page=num;
    this.binItem_ = this.binService.getItembyBin(this.code);
    console.log(this.binItem_);
    }

    back(url: any): void {
      this.router.navigateByUrl(`${url}`);
    }

    showDetail(num: string): any{
      this.subQuery = this.binService.getItemByNum(num).subscribe(data=>this.item=data);
    }
  
    closeDetail(){
      this.item = null;
    }

}

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Bin, BinItem, Item, PutAwayItem } from '../_models';
import { AccountService, PutAwayService, UrlService } from '../_services';

@Component({
  selector: 'app-put-away-lists',
  templateUrl: './put-away-lists.component.html',
  styleUrls: ['./put-away-lists.component.css']
})
export class PutAwayListsComponent implements OnInit {

  binItem_: Observable<BinItem[]>;
  selectedItems: Array<BinItem>= [];
  binCode: string = "RECEIVING";
  page: number=1;

  previousUrl_: Observable<string>;
  bin: Bin;
  subQuery: Subscription;
  item: Item;

  constructor(private putAwayService: PutAwayService, 
              private route: ActivatedRoute, 
              private router: Router, 
              private urlService: UrlService,
              private headerService: AccountService) {   }


  ngOnInit(): void {   
    this.headerService.setTitle("Put Away");
    this.previousUrl_= this.urlService.previousUrl$;
    this.binItem_ = this.putAwayService.getItemByReceiving(this.binCode);
    console.log(this.binItem_);
  }

  ngOnDestory():void{
    if(this.subQuery)
       this.subQuery.unsubscribe();
  }

  getPage(num: any): void {
    this.page=num;
    // this.binItem_ = this.putAwayService.getItemByReceiving(this.binCode);
    // console.log(this.binItem_);
    }

    back(url: any): void {
      this.router.navigateByUrl(`${url}`);
    }


    selected(event: any, item: BinItem ){
      console.log("item----", item);  
      if(event.target.checked == true) {       
        this.selectedItems.push(item);
      }
      if(event.target.checked == false){
        this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
        console.log(this.selectedItems);
      }
    }

    clean(): void {
      this.selectedItems = [];
    }

    submit() : void {
       this.router.navigate(['putaway'], {state: this.selectedItems});
    }


}

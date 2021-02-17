import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BinService, UrlService } from '../_services';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BinItem } from '../_models';
import { Observable } from 'rxjs';
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

  constructor(private binService: BinService, private route: ActivatedRoute, private router: Router, 
    private urlService: UrlService) { 
    this.code = this.route.snapshot.queryParamMap.get("code");
  }

  ngOnInit(): void {
    if(!(this.binItem_)){
      this.getPage(this.page);
      this.displayTitle = true;
    }
    this.previousUrl_= this.urlService.previousUrl$;
  }

  getPage(num: any): void {
    this.page=num;
    console.log(this.code);
    this.binItem_ = this.binService.getItembyBin(this.code);
    console.log(this.binItem_);
    }

    back(url: any): void {
      console.log(url);
      this.router.navigateByUrl(`${url}`);
    }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BinItem } from '../_models';
import { AccountService, BinService } from '../_services';

@Component({
  selector: 'app-bin-item-management',
  templateUrl: './bin-item-management.component.html',
  styleUrls: ['./bin-item-management.component.css']
})
export class BinItemManagementComponent implements OnInit {

  bin_: Observable<BinItem[]>;
  item_: Observable<BinItem[]>;
  selector: string = "bin";
  searchInput: string;
  page: number =1;

  constructor(private headService : AccountService, private router: Router, private binService: BinService) { }

  ngOnInit(): void {
    this.headService.setTitle("Bin-Item Management");   
  }

  selectKey($event: any): void{
     this.selector = $event.target.value;
     console.log(this.selector);
  }

 onSubmit(): void{
    this.item_ = null;
    this.bin_=null;
    if(this.selector=="bin") {
      this.item_ = this.binService.getItembyBin(this.searchInput);
      this.router.navigate(['bin-item'],{queryParams: {code: this.searchInput }});
    }
    else if(this.selector=="item") {
      this.bin_ = this.binService.getBinbyItem(this.searchInput);
      this.router.navigate(['bin-item'],{queryParams: {number: this.searchInput }});
    }


  }


  getPage(num: any): void {
    // this.page=num;
    // this.binItem_ = this.binService.getItembyBin(this.route.snapshot.queryParamMap.get("code"));
    // console.log(this.binItem_.subscribe.length);
  //   if(this.binItem_.length < 15)
  //       this.nextPage = false;
    }


}

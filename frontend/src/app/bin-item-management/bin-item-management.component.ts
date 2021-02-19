import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  err: any;

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
      try{
        this.item_ = this.binService.getItembyBin(this.searchInput.trim());
        this.router.navigate(['bin-item'],{queryParams: {code: this.searchInput.trim()}});
      }catch(error){
        console.log(error);
      }
    }
    else if(this.selector=="item") {
      this.bin_ = this.binService.getBinbyItem(this.searchInput.trim());
      this.router.navigate(['bin-item'],{queryParams: {number: this.searchInput.trim() }});
    }


  }


  getPage(num: any): void {
    this.page=num;
    // this.binItem_ = this.binService.getItembyBin(this.route.snapshot.queryParamMap.get("code"));
  

    }


}

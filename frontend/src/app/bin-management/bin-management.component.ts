import { Component, OnInit } from '@angular/core';
import { Bin } from '../_models';
import { BinService } from '../_services';

@Component({
  selector: 'app-bin-management',
  templateUrl: './bin-management.component.html',
  styleUrls: ['./bin-management.component.css']
})
export class BinManagementComponent implements OnInit {

  bins: Array<Bin>;
  pageTitle: string;
  private liveBinsSub :any;

  constructor(private binService : BinService) { }

  getPage(num: any): void {
    // this.liveBinsSub = this.binService.get(num, this.tag, this.category).subscribe(data => this.blogPosts = data);
    //     if(this.liveBinSub.length > 0) {
    //    this.blogPosts = this.livePostsSub;
    //    this.page = num;
    //   // console.log(this.page);
    //  }
    }

  ngOnInit(): void {

     this.liveBinsSub = this.binService.get().subscribe(data=>this.bins=data);
  }

  ngOnDestroy() {
    if(this.liveBinsSub){this.liveBinsSub.unsubscribe();}
 }

}

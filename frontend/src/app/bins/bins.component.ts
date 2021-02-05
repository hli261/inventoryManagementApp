import { Component, Input, OnInit } from '@angular/core';
import { Bin } from '../_models';

@Component({
  selector: 'app-bins',
  templateUrl: './bins.component.html',
  styleUrls: ['./bins.component.css']
})
export class BinsComponent implements OnInit {

  @Input() bins: Array<Bin>;

  constructor() { }

  ngOnInit(): void {
  }

  // goToPage(pageNum:any) {
  //   // assume that "pageNum" holds a page number value
  //   this.router.navigate(['/product-list'], { queryParams: { page: pageNum } });
  // }

}

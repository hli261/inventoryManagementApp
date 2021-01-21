import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  @Input() page: number =2;
  @Output() newPage = new EventEmitter;  

  constructor() { }

  ngOnInit(): void {
  }

  btnLeftClicked(){
    if(this.page > 1) {
      this.page -= 1;
      this.newPage.emit(this.page);
    }
}

  btnRightClicked(){
    this.page += 1;
    this.newPage.emit(this.page);
}
}

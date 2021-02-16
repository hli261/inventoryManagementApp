import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  @Input() page: number;
  @Output() newPage = new EventEmitter;  
  // @Input() nextPage: boolean =true;

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
    // if(this.nextPage){
      this.page += 1;
    // }    
    this.newPage.emit(this.page);
}
}

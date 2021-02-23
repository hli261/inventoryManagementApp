import { Component, Input, OnInit } from '@angular/core';
import { Observable,} from 'rxjs';
import { Bin } from '../_models';

@Component({
  selector: 'app-bins',
  templateUrl: './bins.component.html',
  styleUrls: ['./bins.component.css']
})
export class BinsComponent implements OnInit {

  @Input() bins_: Observable<Bin[]>;
  // @Input() bins_: Bin[];
  detail: boolean = true;

  constructor() {     
  }

  ngOnInit(): void {
 }
  
 setUrl(){
   console.log(window.location.href);
 }
   

}

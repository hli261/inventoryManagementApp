import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ship } from '../_models';
import { UrlService } from '../_services';

@Component({
  selector: 'app-ship-records',
  templateUrl: './ship-records.component.html',
  styleUrls: ['./ship-records.component.css']
})
export class ShipRecordsComponent implements OnInit {

  @Input() ships_: Observable<Ship[]>;
  @Input() page: number;
  
  constructor(private urlService : UrlService) { }

  ngOnInit(): void {
  }

  // recordUrl(num: string){
  //    this.urlService.setPreviousUrl(`ships`);
  // }

}

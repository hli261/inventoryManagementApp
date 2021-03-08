import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ship } from '../_models';
import { ReceivingService, AccountService, UrlService } from '../_services';

@Component({
  selector: 'app-ship-record',
  templateUrl: './ship-record.component.html',
  styleUrls: ['./ship-record.component.css']
})
export class ShipRecordComponent implements OnInit {

  ship_: Observable<Ship>;
  shipNum: string;
  previousUrl_: Observable<string>;
  
  constructor(private receivingService : ReceivingService, 
              private route : ActivatedRoute,
              private headerService : AccountService,
              private urlService: UrlService,
              private router: Router, ) {
    this.shipNum = this.route.snapshot.params['shipNum'];
   }

  ngOnInit(): void {
     this.ship_ = this.receivingService.getShipByNum(this.shipNum);
     this.headerService.setTitle("Ship Detail");
     this.previousUrl_= this.urlService.previousUrl$;
     
    console.log("shipdetatil");
  }
  back(url: any): void {
    this.router.navigateByUrl(`${url}`);
  }

}

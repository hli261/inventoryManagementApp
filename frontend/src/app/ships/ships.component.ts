import { Component, OnInit } from '@angular/core';
import { Ship } from '../_models/ship';
import { ShipService, AccountService } from '../_services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.css']
})
export class ShipsComponent implements OnInit {

  ships!: Array<Ship>;
  pageTitle: string;
  private liveShipsSub :any;

  constructor(private data:ShipService, private router: Router, private headerService: AccountService) {

  }

  ngOnInit(): void {
    this.liveShipsSub = this.data.get().subscribe(data=>this.ships = data);
    this.headerService.setTitle('List of Ships');
  }

  ngOnDestroy(){
    this.liveShipsSub.unsubscribe();
  }

}

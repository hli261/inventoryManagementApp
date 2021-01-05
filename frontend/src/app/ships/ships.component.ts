import { Component, OnInit } from '@angular/core';
import { Ship } from '../ship';
import { ShipService } from '../services/ship.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.css']
})
export class ShipsComponent implements OnInit {

  ships!: Array<Ship>;
  private liveShipsSub :any;

  constructor(private data:ShipService, private router: Router) {

  }

  ngOnInit(): void {
    this.liveShipsSub = this.data.get().subscribe(data=>this.ships = data);
  }

  ngOnDestroy(){
    this.liveShipsSub.unsubscribe();
  }

}

import { Component, OnInit } from '@angular/core';
import { BinService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { BinItem } from '../_models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bin-items',
  templateUrl: './bin-items.component.html',
  styleUrls: ['./bin-items.component.css']
})
export class BinItemsComponent implements OnInit {

  binItem_: Observable<BinItem>;

  constructor(private binService: BinService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.binItem_ = this.binService.getbyBinId(this.route.snapshot.params['id'])
  }

}

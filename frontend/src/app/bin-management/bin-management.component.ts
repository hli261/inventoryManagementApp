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

  constructor() { }

  ngOnInit(): void {


  }

}

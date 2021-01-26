import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private headerService: AccountService) { }

  ngOnInit(): void {
    this.headerService.setTitle('Home');
  }

}

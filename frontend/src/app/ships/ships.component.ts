import { Component, OnInit } from '@angular/core';
import { Ship } from '../_models';
import { ReceivingService, AccountService } from '../_services';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.css']
})
export class ShipsComponent implements OnInit {

  ships!: Array<Ship>;
  pageTitle: string;
  private sub :any;
  shipMethod: Array<any>;
  ships_: Observable<Ship[]>;
  pageSize: number = 10;
  page: number = 1;
  errorMessage: string = "";
  start: string;
  end: string;

  constructor(private data:ReceivingService, private router: Router, private headerService: AccountService) {

  }

  ngOnInit(): void {
    // this.sub = this.data.getShips().subscribe(data=> {this.ships = data; console.log(this.ships);});    
    this.getPage(this.page);
    this.headerService.setTitle('Ship Information');
    this.sub = this.data.getShippingMethod().subscribe(data => this.shipMethod = data);   
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  selectType(event: any, bType: any): void {
    // if (event.target.checked === true) {      
    //   this.type.push(bType.typeName);
    // }
    // if (event.target.checked === false) {
    //   this.type.splice(this.type.indexOf(bType.typeName), 1);
    // }
  }

  selectMethod(event: any): void {
    // if (event.target.value !== "Location") {
    //   this.location = event.target.value;
    // }
  }

  setStart(event: any): void{
    // this.minCode = event.target.value.trim();    
  }

  setEnd(event: any): void{
    // this.maxCode = event.target.value.trim();
  }

  filter(): void {
    // this.page = 1;
    // if (!(this.minCode) && this.maxCode || this.minCode == this.maxCode) {
    //   this.minCode = this.maxCode;
    //   this.maxCode = "";
    // }
    // this.getPage(this.page);
    // {
    //   this.type=[];
    // }
  }

  clear(){
      this.router.navigate(['ships']);
  }

  getPage(num: number): void {
    this.page = num;
    // // this.router.navigate(['/bins'], { queryParams: { pageNumber: this.page, pageSize: this.pageSize }, queryParamsHandling :"merge" });
    // this.router.navigate(['/bins-list'], { queryParams: { type: this.type, location: this.location, minCode: this.minCode, maxCode: this.maxCode, pageNumber: this.page, pageSize: this.pageSize }});
    // this.urlService.setPreviousUrl(`bins-list?pageNumber=${this.page}&pageSize=${this.pageSize}&type=${this.type}&location=${this.location}&minCode=${this.minCode}&maxCode=${this.maxCode}`);
    // this.bins_ = this.binService.getQuery(this.page, this.pageSize, this.type.toString(), this.location, this.minCode, this.maxCode)
    // this.sub = this.data.getShips(num, this.pageSize).subscribe(data=> {this.ships = data; console.log(this.ships);}); 
     this.ships_ = this.data.getShips(num, this.pageSize).pipe(take(5));
     console.log(this.ships_);     
  }

  getPageFromQuery() {
      // this.route.queryParams.subscribe((params: any) => {
      //   this.type = this.route.snapshot.queryParamMap.getAll('type');
      //   this.location = this.route.snapshot.queryParamMap.get('location');
      //   this.minCode = this.route.snapshot.queryParamMap.get('minCode');
      //   this.maxCode = this.route.snapshot.queryParamMap.get('maxCode');
      //   this.page = Number(this.route.snapshot.queryParamMap.get('pageNumber')) || 1;
      //   this.pageSize = Number(this.route.snapshot.queryParamMap.get('pageSize')) || 10;
      //   this.getPage(this.page);
      // })
  }

}

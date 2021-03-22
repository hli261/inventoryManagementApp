import { Component, OnInit, Type } from '@angular/core';
import { Ship } from '../_models';
import { ReceivingService, AccountService, UrlService } from '../_services';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';


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
  errorMessage: string = "";

  pageSize: number = 10;
  page: number = 1;
  selector: string = "shipNum";
  searchInput: string;
  shipType: string;
  start: string = "";
  end: string = "";
  

  constructor(private data:ReceivingService, 
              private router: Router, 
              private headerService: AccountService,
              private urlService : UrlService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {    
    this.headerService.setTitle('Ship Information');
    this.sub = this.data.getShippingMethod().subscribe(data => this.shipMethod = data);
    if(window.location.pathname === "/ships-list"){
      console.log(window.location.search);
      this.getPageFromQuery();
    }
    // if(window.location.pathname === "/ships"){
    //   console.log(window.location.search);
    // }
    this.getPage(this.page);
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
    if (event.target.value !== "Ship Method") {
      this.shipType = event.target.value;
    }
  }

  setStart(event: any): void{
    this.start = event.target.value.trim();    
  }

  setEnd(event: any): void{
    this.end = event.target.value.trim();
  }

  filter(): void {
    this.page = 1;
    if (!(this.start) && this.end || this.start == this.end) {
      this.start = this.end;
      this.start = "";
    }
    this.getPage(this.page);
 
  }

  selectKey($event : any) : void {
    this.selector = $event.target.value;
    console.log(this.selector);
  }

  clear(){
      this.router.navigate(['ships']);
  }

  getPage(num: number): void {
    this.page = num;
    this.ships_ = this.data.getAllShips(num, this.pageSize);  
    // this.router.navigate(['/ships-list'], { queryParams: { pageNumber: this.page, pageSize: this.pageSize }});
    this.urlService.setPreviousUrl(`ships-list?pageNumber=${this.page}&pageSize=${this.pageSize}`);
    // if(this.start != "") {
    //   this.ships_ = this.data.getShips(this.start, this.end, this.searchInput, num, this.pageSize); 
    // } 
    
  }

  getPageFromQuery() {
      this.route.queryParams.subscribe((params: any) => {    
        this.page = Number(this.route.snapshot.queryParamMap.get('pageNumber')) || 1;
        this.pageSize = Number(this.route.snapshot.queryParamMap.get('pageSize')) || 10;
        this.getPage(this.page);
      })
  }

  onSubmit(): void {
    if(!this.searchInput){
      this.getPage(this.page);
    }
    else{
    if(this.selector === "shipNum"){
      this.ships_ = this.data.getShipArrayByNum(this.searchInput).pipe(
        catchError(err => {
          this.errorMessage = err; return throwError(err);
         })
       );
       setTimeout(()=>{
        this.errorMessage="";
      }, 3000);
    }
    if(this.selector === "vendorNum"){
     this.ships_ = this.data.getShipsByVendor(this.searchInput,this.page, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err; return throwError(err);
       })
     );
     setTimeout(()=>{
      this.errorMessage="";
    }, 3000);
    }
  }

 }

}

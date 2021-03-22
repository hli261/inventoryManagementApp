import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { textChangeRangeIsUnchanged } from 'typescript';
import { ReceiveOrder } from '../_models';
import { AccountService, ReceivingService, UrlService } from '../_services';

@Component({
  selector: 'app-receiving-orders',
  templateUrl: './receiving-orders.component.html',
  styleUrls: ['./receiving-orders.component.css']
})
export class ReceivingOrdersComponent implements OnInit {

  orders_: Observable<ReceiveOrder[]>;
  page: number = 1;
  errorMessage: string;
  pageSize: number = 10;
  sub: Subscription;
  searchInput: string;
  selector: string ="roNum";
  status: string;
  

  constructor(private data: ReceivingService,
              private headerService : AccountService,
              private urlService : UrlService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void {    
    this.headerService.setTitle("RO Information");
    if(window.location.pathname === "/orders-list"){
      console.log(window.location.search);
      this.getPageFromQuery();
    }
    if(window.location.pathname === "/orders"){
      console.log(window.location.search);
      this.getPage(this.page);
    }
  }

  getPage(num: number): void {
    this.page = num;
    if(status){
      this.orders_ = this.data.getROArrayByStatus(this.status, num, this.pageSize);
    }else{
      this.orders_ = this.data.getAllRO(num, this.pageSize);
    }
    // this.router.navigate(['/orders-list'], { queryParams: { pageNumber: this.page, pageSize: this.pageSize }});
    this.urlService.setPreviousUrl(`orders-list?pageNumber=${this.page}&pageSize=${this.pageSize}`);
  }

  
  getPageFromQuery() {
      this.route.queryParams.subscribe((params: any) => {    
        this.page = Number(this.route.snapshot.queryParamMap.get('pageNumber')) || 1;
        this.pageSize = Number(this.route.snapshot.queryParamMap.get('pageSize')) || 10;
        this.getPage(this.page);
      })
  }

  selectKey($event : any) : void {
    this.selector = $event.target.value;
    console.log(this.selector);
  }

  onSubmit(): void {
    if(!this.searchInput){
      this.getPage(this.page);
    }
    else{
      if(this.selector === "roNum"){
        this.orders_ = this.data.getROArrayByRONum(this.searchInput).pipe(
          catchError(err => {
            this.errorMessage = err; return throwError(err);
           })
         );
      }
      if(this.selector === "lotNum"){
       this.orders_ = this.data.getROArrayBylotNum(this.searchInput).pipe(
        catchError(err => {
          this.errorMessage = err; return throwError(err);
         })
       );
        setTimeout(()=>{
          this.errorMessage="";
        }, 3000);
       console.log(this.orders_);
     }
    }    
    

  }

  checkStatus(event: any){
    console.log(event);
    this.page = 1;
    if (event.target.checked === true) {      
      this.status = event.target.value;
      this.orders_ = this.data.getROArrayByStatus(event.target.value, this.page, this.pageSize).pipe(
        catchError(err => {
          this.errorMessage = err; return throwError(err);
         })
       );
    }
    if (event.target.checked === false) {
      this.status ="";      
      this.getPage(this.page);
    }
  }

 


}

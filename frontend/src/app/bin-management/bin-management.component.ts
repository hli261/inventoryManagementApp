import { Component, OnInit } from '@angular/core';
import { Bin, BinType } from '../_models';
import { AccountService, BinService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bin-management',
  templateUrl: './bin-management.component.html',
  styleUrls: ['./bin-management.component.css']
})
export class BinManagementComponent implements OnInit {

  binType: Array<BinType>;
  type: Array<string> =[];
  warehouseLocation: any;
  location: string ="";

  minCode: string ="";
  maxCode: string ="";

  bins_: Observable<Bin[]>;
  pageSize: number = 15;
  page: number =1;

  constructor(private binService : BinService, 
              private headService: AccountService,
              private router: Router) {  }
 
  ngOnInit(): void {
     this.headService.setTitle("Bin Management");   
     this.binService.getBinType().subscribe(data=>this.binType=data);  
     this.binService.getWarehouseLocation().subscribe(data=>this.warehouseLocation=data);  
  }

  ngOnDestroy() {    
 }

 selectType(event: any, bType: any): void{
   if(event.target.checked=== true) { 
     this.type.push(bType.typeName);
   }
   if(event.target.checked=== false) { 
    this.type.splice(this.type.indexOf(bType.typeName), 1);     
   } 
 }

 selectLocation(event: any): void{
  if(event.target.value!=="Location") {
    this.location = event.target.value;
  }
 }

 filter(): void{
   console.log(this.type.toString());
   console.log(this.minCode);  
   this.router.navigate(['/bins'], { queryParams: { type: this.type , location: this.location, minCode: this.minCode, maxCode: this.maxCode}});
   this.getPage(1);
 }

 // goToPage(pageNum:any) {
  //   // assume that "pageNum" holds a page number value
  //   this.router.navigate(['/product-list'], { queryParams: { page: pageNum } });
  // }

  getPage(num: any): void {
    this.page=num;
    this.bins_ = this.binService.getQuery(this.page, this.pageSize, this.type.toString(), this.location, this.minCode, this.maxCode);
    console.log(this.bins_);      
    }

}

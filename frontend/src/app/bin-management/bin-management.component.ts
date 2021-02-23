import { Component, OnInit } from '@angular/core';
import { Bin, BinType } from '../_models';
import { AccountService, BinService, UrlService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-bin-management',
  templateUrl: './bin-management.component.html',
  styleUrls: ['./bin-management.component.css']
})
export class BinManagementComponent implements OnInit {

  binType: Array<BinType>;
  type: Array<string> = [];
  warehouseLocation: any;
  location: string = "";
  minCode: string = "";
  maxCode: string = "";

  bins: Array<Bin>;
  querySub: Subscription;
  bins_: Observable<Bin[]>;
  pageSize: number = 10;
  page: number = 1;
  previousUrl: string = '';

  errorMessage: string;

  constructor(private binService: BinService,
    private headService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private urlService: UrlService) { }

  ngOnInit(): void {
    this.headService.setTitle("Bin Management");
    this.querySub=this.binService.getBinType().subscribe(data => this.binType = data);
    this.querySub=this.binService.getWarehouseLocation().subscribe(data => this.warehouseLocation = data);
    if(window.location.pathname === "/bins-list"){
      console.log(window.location.search);
      this.getPageFromQuery();
    }
  }

  ngOnDestroy() {
    this.querySub.unsubscribe();
  }

  selectType(event: any, bType: any): void {
    if (event.target.checked === true) {
      if(this.type.includes(bType.typeName)){
        this.type.splice(this.type.indexOf(bType.typeName), 1);
      }
      this.type.push(bType.typeName);
    }
    if (event.target.checked === false) {
      this.type.splice(this.type.indexOf(bType.typeName), 1);
    }
  }

  selectLocation(event: any): void {
    if (event.target.value !== "Location") {
      this.location = event.target.value;
    }
  }

  setMinCode(event: any): void{
    this.minCode = event.target.value.trim();    
  }

  setMaxCode(event: any): void{
    this.maxCode = event.target.value.trim();
  }

  filter(): void {
    this.page = 1;
    if (!(this.minCode) && this.maxCode || this.minCode == this.maxCode) {
      this.minCode = this.maxCode;
      this.maxCode = "";
    }
    this.getPage(this.page);
    {
      console.log(this.type);
      this.type=[];
      console.log(this.type);
    }
  }

  clear(){
      this.router.navigate(['/bins']);
  }

  getPage(num: any): void {
    this.page = num;
    // this.router.navigate(['/bins'], { queryParams: { pageNumber: this.page, pageSize: this.pageSize }, queryParamsHandling :"merge" });
    this.router.navigate(['/bins-list'], { queryParams: { type: this.type, location: this.location, minCode: this.minCode, maxCode: this.maxCode, pageNumber: this.page, pageSize: this.pageSize }});
    this.urlService.setPreviousUrl(`bins-list?pageNumber=${this.page}&pageSize=${this.pageSize}&type=${this.type}&location=${this.location}&minCode=${this.minCode}&maxCode=${this.maxCode}`);
    this.bins_ = this.binService.getQuery(this.page, this.pageSize, this.type.toString(), this.location, this.minCode, this.maxCode)
      
  }

  getPageFromQuery() {
      this.route.queryParams.subscribe((params: any) => {
        this.type = this.route.snapshot.queryParamMap.getAll('type');
        this.location = this.route.snapshot.queryParamMap.get('location');
        this.minCode = this.route.snapshot.queryParamMap.get('minCode');
        this.maxCode = this.route.snapshot.queryParamMap.get('maxCode');
        this.page = Number(this.route.snapshot.queryParamMap.get('pageNumber')) || 1;
        this.pageSize = Number(this.route.snapshot.queryParamMap.get('pageSize')) || 10;
        this.getPage(this.page);
      })
  }


}

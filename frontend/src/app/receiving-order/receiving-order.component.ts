import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ReceiveOrder, RoItem } from '../_models';
import { AccountService, ReceivingService, UrlService, PutAwayService } from '../_services';

@Component({
  selector: 'app-receiving-order',
  templateUrl: './receiving-order.component.html',
  styleUrls: ['./receiving-order.component.css']
})
export class ReceivingOrderComponent implements OnInit {

  roItems: Array<RoItem>;
  state: any;
  sub: Subscription;
  roNum: string;
  successMessage: string;
  errorMessage: string;
  ro: ReceiveOrder;
  previousUrl_: Observable<string>;


  constructor(private router: Router, 
              private data : ReceivingService,
              private route : ActivatedRoute,
              private headerService: AccountService,
              private urlService : UrlService,
              private putAwayService : PutAwayService) {     
     this.state = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    if(this.state) {
      this.roItems = this.state.getReceivingItemDtos;
      this.roNum = this.state.roNumber;
      this.sub = this.data.getROByRONum(this.roNum).subscribe((data)=>{
        this.ro = data;
        console.log(this.ro);
      })
      this.headerService.setTitle("RO create");
    }    
    if(window.location.pathname.includes("/order-edit/") ){
      this.roNum = this.route.snapshot.params['roNum'];
      this.sub = this.data.getROItemsByRONum(this.roNum).subscribe((data)=>{
        this.roItems = data;
      })
      this.sub = this.data.getROByRONum(this.roNum).subscribe((data)=>{
        this.ro = data;
      })
      this.headerService.setTitle("RO edit");
    }
     this.previousUrl_= this.urlService.previousUrl$; 
  }

  ngOnDestroy(){
    if(this.sub)
      this.sub.unsubscribe();
  }
  
  onChange(item:any): void{
    console.log(item);
      item.diffQty = item.orderQty-item.receiveQty;   
  }

  save(): void{
      this.sub = this.data.updateROItems(this.roNum, this.roItems).subscribe((data)=>{
        this.successMessage = "Order has been saved!"
        setTimeout(()=>{
          this.successMessage="";
          this.router.navigate(['order-detail', this.ro.roNumber]);
        }, 2000);
      },
      err => {
        console.log("this is an error:" , err);
      }
       
      )
  }

  submit(): void{
    this.sub = this.data.updateROItems(this.roNum, this.roItems).subscribe();
    this.ro.status = "TEST";
    // this.ro.status = "SUBMIT";
    this.sub = this.data.updateStatus(this.roNum,this.ro.status, this.roItems).subscribe((data)=>{
      this.ro = data;
      this.successMessage = "Order has been submitted!"
      console.log("sent to Receiving-----", this.ro);
      this.putAwayService.moveToReceiving(this.ro).subscribe(data =>{
           console.log("receiving bin items-----", data);
      })
      setTimeout(()=>{
        this.successMessage="";
        this.router.navigate(['order-detail', this.ro.roNumber]);
      }, 2000);
    },
    err => {
      this.errorMessage = err;
      console.log("this is an error:" , err)
    }
     
    )
  }

  back(url: any): void {
    this.router.navigateByUrl(`${url}`);
  }

}

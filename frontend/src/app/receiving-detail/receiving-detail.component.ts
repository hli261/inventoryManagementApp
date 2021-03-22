import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ReceiveOrder, RoItem, User, Vender } from '../_models';
import { AccountService, AuthService, ReceivingService, UrlService } from '../_services';

@Component({
  selector: 'app-receiving-detail',
  templateUrl: './receiving-detail.component.html',
  styleUrls: ['./receiving-detail.component.css']
})
export class ReceivingDetailComponent implements OnInit {

  sub: Subscription;
  ro: ReceiveOrder;
  roNum: string;
  roItems: Array<RoItem>;
  user: User;
  vender: Vender;
  previousUrl_: Observable<string>;

  constructor(private data: ReceivingService,
              private route:  ActivatedRoute,
              private router: Router,
              private headerService: AccountService,
              private urlService :UrlService) { }

  ngOnInit(): void {
    this.roNum = this.route.snapshot.params['roNum'];
      this.sub = this.data.getROByRONum(this.roNum).subscribe((data)=>{
        this.ro = data;
        this.roItems = data.getReceivingItemDtos;
        this.sub = this.headerService.getByEmail(this.ro.userEmail).subscribe((data)=>{
          this.user = data;
        })
        this.sub = this.data.getVenderByNum(this.ro.venderNo).subscribe((data)=>{
          this.vender = data;
        })
      })
      this.headerService.setTitle("RO details"); 
      this.previousUrl_= this.urlService.previousUrl$;     
  }

  ngOnDestroy(){
    if(this.sub)
      this.sub.unsubscribe();
  }

  back(url: any): void {
    this.router.navigateByUrl(`${url}`);
  }

}

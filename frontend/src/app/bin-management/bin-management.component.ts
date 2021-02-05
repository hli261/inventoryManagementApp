import { Component, OnInit } from '@angular/core';
import { Bin } from '../_models';
import { AccountService, BinService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bin-management',
  templateUrl: './bin-management.component.html',
  styleUrls: ['./bin-management.component.css']
})
export class BinManagementComponent implements OnInit {

  bins: Array<Bin>;
  private liveBinsSub :any;
  type: string;
  location: string;


  constructor(private binService : BinService, 
              private headService: AccountService,
              private router: Router,
              private route: ActivatedRoute) { 
                this.type = this.route.snapshot.queryParams.type;
                // this.querySub = this.route.queryParams.subscribe(params => {
                //   this.resetToken = params.token;
                //   this.email = params.email;
                //   console.log(this.resetToken);
                //   this.authService.setTitle("Reset Password");
                // });
               }

  getPage(num: any): void {
    // this.liveBinsSub = this.binService.get().subscribe(data => this.bins = data);
    //     if(this.liveBinSub.length > 0) {
    //    this.blogPosts = this.livePostsSub;
    //    this.page = num;
    //   console.log(this.page);
    //  }
    }

   

  ngOnInit(): void {
     this.headService.setTitle("Bin Management");
     this.liveBinsSub = this.binService.get().subscribe(data=>this.bins=data);
  }

  ngOnDestroy() {
    if(this.liveBinsSub){this.liveBinsSub.unsubscribe();}
 }

 selectType(event: any): void{
console.log(event);

   if(event.target.value!=="Type") {
     this.type = event.target.value;
    //  this.liveBinsSub = this.binService.get().subscribe(data=>this.bins=data);
    
      this.router.navigate(['/bins'], { queryParams: { type: event.target.value }, queryParamsHandling :"merge"} );
    
     console.log(this.type);
   }
   this.type = "";
 }

 selectLocation(event: any): void{
  if(event.target.value!=="Location") {
    this.location = event.target.value;
    this.router.navigate(['/bins'], { queryParams: { location: event.target.value }, queryParamsHandling :"merge"});
  }
  this.location = "";
 }

}

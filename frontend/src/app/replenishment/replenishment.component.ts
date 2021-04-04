import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PutAwayItem } from '../_models';
import { AccountService, PutAwayService } from '../_services';

@Component({
  selector: 'app-replenishment',
  templateUrl: './replenishment.component.html',
  styleUrls: ['./replenishment.component.css']
})
export class ReplenishmentComponent implements OnInit {

  item: PutAwayItem = new PutAwayItem();
  successMessage: string;
  errorMessage: string;
  sub: Subscription;

  constructor(private router: Router,
              private headerService: AccountService,
              private putAwayService : PutAwayService) { }

  ngOnInit(): void {
    this.headerService.setTitle("Replenishment")
  }

  

  moveReplenishment() : void{
    var temp = new PutAwayItem();
    temp.fromBinCode =this.item.fromBinCode;
    temp.itemNumber = this.item.itemNumber;
    temp.lotNumber = this.item.lotNumber;
    temp.quantity = this.item.quantity;
    temp.destinationBinCode = "REPLENISHMENT";    
    this.sub = this.putAwayService.moveToReplenishment(temp).subscribe((data)=>{
      console.log(data);
    },
     err => {
       this.errorMessage = err;
       console.log(err);
       setTimeout(()=>{
        this.errorMessage="";
      }, 3000);
       return;
     })

     this.sub = this.putAwayService.removeFromOverstock(temp).subscribe((data)=>{
      console.log(data);
      this.successMessage = "Items have been moved to operation bin successfully!"
      setTimeout(()=>{
        this.successMessage="";
        // this.router.navigate(['putaway-list']);
      }, 3000);
    },
     err => {
       this.errorMessage = err;
       console.log(err);
       setTimeout(()=>{
        this.errorMessage="";
      }, 3000);
       return;
     })
  }

  onSubmit(f: NgForm): void{
    this.moveReplenishment();
     this.sub = this.putAwayService.moveToPrimary(this.item).subscribe((data)=>{
      console.log(data);
    },
     err => {
       this.errorMessage = err;
       console.log(err);
       setTimeout(()=>{
        this.errorMessage="";
      }, 3000);
       return;
     })

     this.sub = this.putAwayService.removeFromReplenishment(this.item).subscribe((data)=>{
      console.log(data);
      this.successMessage = "Replenish completed! Item has been moved from overstock bin to primary bin successfully!"
      setTimeout(()=>{
        this.successMessage="";
        // this.router.navigate(['putaway-list']);
      }, 3000);
    },
     err => {
       this.errorMessage = err;
       console.log(err);
       setTimeout(()=>{
        this.errorMessage="";
      }, 3000);
       return;
     })

  }

}

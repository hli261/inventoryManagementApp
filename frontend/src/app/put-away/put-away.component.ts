import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import jspdf from 'jspdf';
import * as jsPDF from 'jspdf';
import { Subscription } from 'rxjs';
import { BinItem, PutAway, PutAwayBinItem, PutAwayItem } from '../_models';
import { AccountService, PutAwayService, UrlService } from '../_services';

@Component({
  selector: 'app-put-away',
  templateUrl: './put-away.component.html',
  styleUrls: ['./put-away.component.css']
})
export class PutAwayComponent implements OnInit {

  items: Array<BinItem>;
  putAwayItems:  Array<any> = [];
  successMessage: string;
  errorMessage: string;
  state: any;
  sub: Subscription;
  
  @ViewChild('content') content: ElementRef;

  constructor(private router: Router,
              private route : ActivatedRoute,
              private headerService: AccountService,
              private urlService : UrlService,
              private putAwayService : PutAwayService) { 
    this.state = this.router.getCurrentNavigation().extras.state;
    console.log("put away-----", this.state);
    this.headerService.setTitle("Put Away")
  }

  ngOnInit(): void {
    this.mapper();
  }

  mapper(): void{
    if(this.state){
      for(var i=0; i < this.state.length; i++ ) {
        var temp = new PutAwayBinItem();
        temp.itemNumber = this.state[i].itemNumber;
        temp.fromBinCode = this.state[i].binCode;
        temp.lotNumber = this.state[i].lotNumber;
        temp.qty = this.state[i].quantity;
        this.putAwayItems.push(temp);
     }
     console.log(this.putAwayItems);
    }   
  }

  createObj(binCode: boolean): Array<PutAwayItem>{    
    let tempItems:  Array<PutAwayItem> = [];
    for(var i=0; i < this.putAwayItems.length; i++ ) {
      var temp = new PutAwayItem();
      temp.itemNumber = this.putAwayItems[i].itemNumber;
      temp.fromBinCode = this.putAwayItems[i].froBinCode;
      temp.lotNumber = this.putAwayItems[i].lotNumber;
      temp.quantity = this.putAwayItems[i].quantity;
      if(binCode) { 
         temp.destinationBinCode ="PUTAWAY";
        }else{
          temp.destinationBinCode = this.putAwayItems[i].destinationBinCode;
        } 
      tempItems.push(temp);
   }
   console.log(tempItems);
   return tempItems;
  }
 
  savePDF() : void{
    // let DATA=this.content.nativeElement;  
    // // let doc = new jspdf('p','pt', 'a4');
    // let doc = new jsPDF();
    // let handleElement =  
    // {  
    //   '#editor':function(element : any, renderer : any){  
    //     return true;  
    //   }  
    // };  
    // doc.fromHTML(DATA.innerHTML,15,15,{
    //   'width': 190,
    //   'elementHandlers': handleElement
    // });
    // doc.save('putaway-list.pdf');  
  }

  movePutaway() : void{
    var putaway = new PutAway();
    putaway.createBinItemForPutawayDtos = this.createObj(true);
    console.log(putaway);
    this.sub = this.putAwayService.moveToPutAway(putaway).subscribe((data)=>{
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

     this.sub = this.putAwayService.removeFromReceiving(putaway).subscribe((data)=>{
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

  submit(): void{
    var putaway = new PutAway();
     putaway.createBinItemForPutawayDtos = this.createObj(false);

     this.sub = this.putAwayService.moveToBin(putaway).subscribe((data)=>{
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

     this.sub = this.putAwayService.removeFromPutAway(putaway).subscribe((data)=>{
      console.log(data);
      this.successMessage = "Items have been moved to bins successfully!"
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

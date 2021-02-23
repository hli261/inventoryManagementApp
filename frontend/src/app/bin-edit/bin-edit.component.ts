import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BinService } from '../_services';
import { Bin, BinEdit } from '../_models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bin-edit',
  templateUrl: './bin-edit.component.html',
  styleUrls: ['./bin-edit.component.css']
})
export class BinEditComponent implements OnInit {

  bin2: Bin;
  bin = new BinEdit();
  sub: Subscription;
  errorMessage!: string;
  successMessage!: string;
  binCode: string;

  constructor(
    private binService: BinService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(param => { this.binCode = param['binCode']; })
  }

  ngOnInit(): void {
    this.sub = this.binService.getByBinCode(this.binCode).subscribe((bin2: Bin) => {
      this.bin.binCode = this.binCode;
      this.bin.binTypeName = bin2.binType.typeName;
      this.bin.warehouseLocationName = bin2.warehouseLocation.locationName;
      this.bin2 = bin2;
    })
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }

  onSubmit(f: NgForm): void {

    this.binService.update(this.bin.binCode, this.bin).subscribe(
      bin => {
        this.bin = bin;
        this.successMessage = "Bin has been updated successfully!";
        setTimeout(() => {
          this.successMessage = "";
          this.router.navigate(['bins']);
        }, 2500);
      },
      error => {
        console.log(error);
        this.errorMessage = "Sever error";
      });
    setTimeout(() => {
      this.errorMessage = "";
    }, 3000
    );
  }

  removeBin(f: NgForm): void {
    this.binService.deleteBin(this.bin.binCode, this.bin2).subscribe(
      (data: any) => {this.bin2 = data,
      this.successMessage = "Bin has been deleted successfully!";
      setTimeout(() => {
        this.successMessage = "";
        this.router.navigate(['bins']);
      }, 2500);
      },
      error => {
        console.log(error);
        this.errorMessage = "Sever error";
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReceivingCreate } from '../_models';
import { ReceivingService } from '../_services/receiving.service';

@Component({
  selector: 'app-receiving-create',
  templateUrl: './receiving-create.component.html',
  styleUrls: ['./receiving-create.component.css']
})
export class ReceivingCreateComponent implements OnInit {

  receiving: ReceivingCreate;
  receiveForm = new FormGroup({});
  errorMessage: any;
  successMessage: any;

  constructor(
    private fb: FormBuilder,
    private data: ReceivingService,
    private router: Router
  ) { this.buildForm(); }

  private buildForm() {
    this.receiveForm = this.fb.group({
      PONumber: [null],
      venderNo: [null],
      shippingNumber: [null]
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.receiveForm.value.PONumber == null || this.receiveForm.value.venderNo == null || this.receiveForm.value.shippingNumber == null) {
      this.errorMessage = "Each option above must be filled in!"
      return;
    }
    this.data.getCreate(this.receiveForm.value.PONumber, this.receiveForm.value.venderNo, this.receiveForm.value.shippingNumber)
      .subscribe((data2: ReceivingCreate) => {
        this.receiving = data2;
        console.log(this.receiving);
        this.successMessage = "loading the data successfully!";
        setTimeout(() => {
          this.successMessage = "";
          this.router.navigate(['order']);
        }, 2000);
      },
        error => {
          this.errorMessage = error;
          setTimeout(() => {
            this.errorMessage = "";
          }, 2000);
        }
      )
  }
}

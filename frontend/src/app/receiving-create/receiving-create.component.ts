import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReceiveOrder, ReceivingCreate} from '../_models';
import { AccountService, AuthService } from '../_services';
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
  newRO : ReceiveOrder;
  sub: Subscription;
  userEmail: string;

  constructor(
    private fb: FormBuilder,
    private data: ReceivingService,
    private router: Router,
    private headerService: AccountService,
    private authService: AuthService
  ) { this.buildForm(); }

  private buildForm() {
    this.receiveForm = this.fb.group({
      PONumber: [null],
      venderNo: [null],
      shippingNumber: [null]
    });
  }

  ngOnInit(): void {
    this.headerService.setTitle('Create Receive Order');
    this.userEmail = this.authService.readToken().nameid;  
   }

  onSubmit() {
    if (this.receiveForm.value.PONumber == null || this.receiveForm.value.venderNo == null || this.receiveForm.value.shippingNumber == null) {
      this.errorMessage = "Each option above must be filled in!"
      return;
    }
    this.sub=this.data.createRO(this.receiveForm.value.PONumber, this.receiveForm.value.venderNo, this.receiveForm.value.shippingNumber, this.userEmail)
      .subscribe(
        (data) => {       
          this.newRO = data;
          console.log(this.newRO);
        this.successMessage = "loading the data successfully!";
        console.log("RO created");
      
        setTimeout(() => {
          this.successMessage = "";
          this.router.navigate(['order'], {state: this.newRO});
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BinService} from '../_services';

@Component({
  selector: 'app-bin-create',
  templateUrl: './bin-create.component.html',
  styleUrls: ['./bin-create.component.css']
})
export class BinCreateComponent implements OnInit {

  binForm = new FormGroup({});
  errorMessage!: string;
  successMessage: string;
  
  constructor(
    private data: BinService,
    private router: Router,
    private fb: FormBuilder,
  ) { this.buildbinForm(); }

  private buildbinForm() {
    this.binForm = this.fb.group({
      typeName: this.binForm.value.typeName,
      binCode: this.binForm.value.binCode,
      locationName: this.binForm.value.locationName
    });
  }
  ngOnInit(): void { }

  onSubmit() {
    if (this.binForm.value.binCode == null || this.binForm.value.typeName == null || this.binForm.value.locationName == null) {
      this.errorMessage = "Each option above must be filled in!"
      return;
    }
    else if (this.binForm.value.binCode.length != 8 || !this.binForm.value.binCode.charAt(0).match(/[A-Z]/) || !this.binForm.value.binCode.charAt(1).match(/[A-Z]/) || !this.binForm.value.binCode.slice(2, 8).match(/^[0-9]+(\.?[0-9]+)?$/)) {
      this.errorMessage = "The binCode must have 8 characters, first two characters must be letters and last 6 characters must be numbers";
      setTimeout(() => {
        this.errorMessage = "";
      }, 3000);
      return;
    };
    
    this.data.add(this.binForm.value).subscribe(     
      () => {
        this.successMessage = "New bin has been created successfully!";
        setTimeout(() => {
          this.successMessage = "";
          this.router.navigate(['bins']);
        }, 2000);
      },
      error => {
        this.errorMessage = error.errors.BinCode;
        setTimeout(() => {
          this.errorMessage = "";
        }, 3000);       
      }
    );
  }
}


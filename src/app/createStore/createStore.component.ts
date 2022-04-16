import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MerchantService } from '../merchant.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-createStore',
  templateUrl: './createStore.component.html',
  styleUrls: ['./createStore.component.scss']
})
export class CreateStoreComponent implements OnInit {
  storeForm !: FormGroup;
  public merchant: any;
  constructor(
    private formBuilder: FormBuilder,
    private merchantService: MerchantService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<CreateStoreComponent>
  ) { }

  ngOnInit() {
    // this.storeForm = this.formBuilder.group({
    //   storeCode: ['', Validators.required],
    //   //merchantCode: [{value: this.merchant.merchantCode, disabled: true}, Validators.required],
    //   merchantCode: [ '', Validators.required],
    //   storeName: ['', Validators.required],
    //   email: ['', Validators.required],
    //   phoneNumber: ['', Validators.maxLength(9)],
    //   address: ['', Validators.maxLength],

    // });
    this.storeForm = new FormGroup({
      'merchantCode' : new FormControl(null, Validators.required),
      'storeCode' : new FormControl(null, Validators.required),
      'storeName' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'phoneNumber' : new FormControl(null, Validators.maxLength(9)),
      'address' : new FormControl(null, [Validators.maxLength(20), Validators.minLength(5)]),
    });
    
  }
  
  get merchantCode() {
    return this.storeForm.get('merchantCode');
  }
  
  get storeCode() {
    return this.storeForm.get('storeCode');
  }
  
  get storeName() {
    return this.storeForm.get('storeName');
  }

 
  get email() {
    return this.storeForm.get('email');
  }


  createStore() {

    if (this.storeForm.valid) {
      this.merchantService.createStore(this.storeForm.value)
        .subscribe({
          next: (res) => {
            this.storeForm.reset();
            this.dialogRef.close('save');

          },
          error: () => {
            alert("Error while adding")
          }
        })
    }
  }
}

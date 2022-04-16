import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from '../merchant.service';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { StoreDetailsComponent } from '../storeDetails/storeDetails.component';

@Component({
  selector: 'app-updateStore',
  templateUrl: './updateStore.component.html',
  styleUrls: ['./updateStore.component.scss']
})
export class UpdateStoreComponent implements OnInit {
  public merchantCodeFormControl: FormControl = new FormControl();
  public storeCodeFormControl: FormControl = new FormControl();
  public storeNameFormControl: FormControl = new FormControl();
  public addressFormControl: FormControl = new FormControl();
  public phoneNumberFormControl: FormControl = new FormControl();
  public emailFormControl: FormControl = new FormControl();
  public store: any;

  constructor(
    private route: ActivatedRoute,
    private merchantService: MerchantService,
    private location: Location,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      const storeCode = params.storeCode;
      const merchantCode = params.merchantCode;
      this.merchantService.getStores(merchantCode, storeCode).subscribe((store) => {
        this.store = store;
        this.initFormControls();
      })
    });
  }
  onBack() {
    this.location.back();
  }
  public updateStore() {
    this.store.merchantCode = this.merchantCodeFormControl.value;
    this.store.storeCode = this.storeCodeFormControl.value;
    this.store.storeName = this.storeNameFormControl.value;
    this.store.address = this.addressFormControl.value;
    this.store.phoneNumber = this.phoneNumberFormControl.value;
    this.store.email = this.emailFormControl.value;
    console.log('store', this.store);
    this.merchantService.UpdateStore(this.store.storeCode, this.store).subscribe(() => {
      this.onBack();
    })
  }
  public initFormControls() {

    this.merchantCodeFormControl = new FormControl({ value: this.store.merchantCode, disabled: true });
    this.storeCodeFormControl = new FormControl({ value: this.store.storeCode, disabled: true });
    this.storeNameFormControl = new FormControl(this.store.storeName);
    this.addressFormControl = new FormControl(this.store.address);
    this.phoneNumberFormControl = new FormControl(this.store.phoneNumber);
    this.emailFormControl = new FormControl(this.store.email);
  }
  
}

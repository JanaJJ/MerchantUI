import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from '../merchant.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})
export class MerchantComponent implements OnInit {
  
  public merchantCodeFormControl:FormControl=new FormControl();
  public nameFormControl:FormControl=new FormControl();
  public fullNameFormControl:FormControl=new FormControl();
  public addressFormControl:FormControl=new FormControl();
  public phoneNumberFormControl:FormControl=new FormControl();
  public emailFormControl:FormControl=new FormControl();
  public websiteFormControl:FormControl=new FormControl();
  public accountNumFormControl:FormControl=new FormControl();
  public merchant:any;

  constructor(
    private route:ActivatedRoute,
    private merchantService:MerchantService,
    private location: Location
  ) { }

  ngOnInit() {
    //za route se koristi params,za quer se koristi queryparams
    this.route.params.subscribe((params:any)=>{
      const merchantCode=params.merchantCode;
      this.merchantService.getMerchantbyId(merchantCode).subscribe((merchant)=>{
        this.merchant=merchant;
        this.initFormControls();
      })
    });
  }
  onBack()
  {
    this.location.back();
  }
  public updateMerchant()
  {
    this.merchant.merchantCode=this.merchantCodeFormControl.value;
    this.merchant.name =this.nameFormControl.value;
    this.merchant.fullName =this.fullNameFormControl.value;
    this.merchant.address =this.addressFormControl.value;
    this.merchant.phoneNumber=this.phoneNumberFormControl.value;
    this.merchant.email=this.emailFormControl.value;
    this.merchant.website=this.websiteFormControl.value;
    this.merchant.accountNum=this.accountNumFormControl.value;
    console.log('merchant',this.merchant);
    this.merchantService.UpdateMerchant(this.merchant.merchantCode,this.merchant).subscribe(()=>{
      this.onBack();
    })
  }
  public initFormControls()
  {
    
      this.merchantCodeFormControl=new FormControl({value:this.merchant.merchantCode, disabled: true});
      this.nameFormControl=new FormControl(this.merchant.name);
      this.fullNameFormControl=new FormControl(this.merchant.fullName);
      this.addressFormControl=new FormControl(this.merchant.address);
      this.phoneNumberFormControl=new FormControl(this.merchant.phoneNumber);
      this.emailFormControl=new FormControl(this.merchant.email);
      this.websiteFormControl=new FormControl(this.merchant.website);
      this.accountNumFormControl=new FormControl(this.merchant.accountNum);
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantService } from '../merchant.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatColumnDef } from '@angular/material/table';

@Component({
  selector: 'app-storeDetails',
  templateUrl: './storeDetails.component.html',
  styleUrls: ['./storeDetails.component.scss']
})
export class StoreDetailsComponent implements OnInit {    
  
  public store:any;     
  constructor(
    private route:ActivatedRoute,
    private merchantService:MerchantService,
    @Inject(MAT_DIALOG_DATA) public data: {merchantCode:string,storeCode:string,storeName:string,
    address:string,email:string,phoneNumber:string}
    ) 
    {
  
    }
  ngOnInit(){
    this.route.params.subscribe((params: any) => {
      const storeCode = params.storeCode;
      const merchantCode = params.merchantCode;
      console.log('storecode',storeCode);
      console.log('merchantcode',merchantCode);
      this.merchantService.getStores(merchantCode, storeCode).subscribe((store) => {
        this.store = store;
        
      })
    });

   }
}

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
    @Inject(MAT_DIALOG_DATA) public data: {merchantCode:string,storeCode:string,storeName:string,
    address:string,email:string,phoneNumber:string}
    ) 
    { }
  ngOnInit(){}
}

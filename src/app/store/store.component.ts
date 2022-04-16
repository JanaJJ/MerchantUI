import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateStoreComponent } from '../createStore/createStore.component';
import { MerchantService } from '../merchant.service';
import { StoreDetailsComponent } from '../storeDetails/storeDetails.component';
import { Location } from '@angular/common';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['storeCode', 'merchantCode', 'storeName', 'details', 'actions'];
  public store: any;
  public merchant: any;
  public find:any;
  panelOpenState = false;
  merchantInfo: any;
  nameInfo: any;
  fullNameInfo: any;
  addressInfo: any;
  numberInfo: any;
  emailInfo: any;
  websiteInfo: any;
  accountNumInfo: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private merchantService: MerchantService,
    private matDialog: MatDialog,
    public dialog: MatDialog,
    private location: Location,) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      const merchantCode = params.merchantCode;
      this.merchantService.GetStoresByMerchantId(merchantCode).subscribe((store: any) => {
        console.log("ova e Store", store);
        this.store = store;
        this.dataSource.data = store;
      })
    }),
      this.route.params.subscribe((params: any) => {
        const merchantCode = params.merchantCode;
        this.merchantService.getMerchantbyId(merchantCode).subscribe((merchant) => {
          this.merchant = merchant;
          this.info();
        })
      });
      
  }
  public info() {
    this.merchantInfo = this.merchant.merchantCode;
    this.nameInfo = this.merchant.name;
    this.fullNameInfo = this.merchant.fullName;
    this.addressInfo = this.merchant.address;
    this.numberInfo = this.merchant.phoneNumber;
    this.emailInfo = this.merchant.email;
    this.websiteInfo = this.merchant.website;
    this.accountNumInfo = this.merchant.accountNum;
  }
  // public stores(merchantCode: string) {
  //   this.merchantService.GetStoresByMerchantId(merchantCode).subscribe((results: any) => {
  //     console.log("stores", results);
  //     this.dataSource.data = results.merchants;
  //   });
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onBack(){
    this.location.back();
  }
  openDialogClick() {
    this.matDialog.open(CreateStoreComponent, {
      width: '500px',
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.route.params.subscribe((params: any) => {
          const merchantCode = params.merchantCode;
          this.merchantService.GetStoresByMerchantId(merchantCode).subscribe((store: any) => {
            console.log("ova e Store", store);
            this.store = store;
            this.dataSource.data = store;
          })
        });
      }
    })
  }



  openStoreOverview(merchantCode:string,storeCode:string,storeName:string,address:string,email:string,phoneNumber:string)
  {
    this.dialog.open(StoreDetailsComponent,{
      width:'600px',height:'430px',
      data:{
        merchantCode:merchantCode,
        storeCode:storeCode,
        storeName:storeName,
        address:address,
        email:email,
        phoneNumber:phoneNumber
      }
    })
  }



  public navigateToActions(merchantCode: string, storeCode: string) {
    this.router.navigate(['merchants/' + merchantCode + '/stores/' + storeCode]);
  }

  public deleteStore(storeCode: string) {
    this.merchantService.DeleteStore(storeCode).subscribe(() => {
      this.route.params.subscribe((params: any) => {
        const merchantCode = params.merchantCode;
        this.merchantService.GetStoresByMerchantId(merchantCode).subscribe((store: any) => {
          console.log("ova e Store", store);
          this.store = store;
          this.dataSource.data = store;
        })
      });
    })
  }

  openDialogToDelete(storeCode:string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        console.log('The dialog was closed');
        this.merchantService.DeleteStore(storeCode).subscribe(() => {
          const indexOfObjects=this.dataSource.data.findIndex((object:any)=>{
            return object.storeCode==storeCode;
          });
          console.log(indexOfObjects);
          this.dataSource.data.splice(indexOfObjects,1);
          console.log(this.dataSource.data);
          this.ngOnInit();
        });

      } 
    });
  }

}

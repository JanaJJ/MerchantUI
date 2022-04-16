import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantComponent } from './merchant/merchant.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { StoreComponent } from './store/store.component';
import { StoreDetailsComponent } from './storeDetails/storeDetails.component';
import { UpdateStoreComponent } from './updateStore/updateStore.component';

const routes: Routes = [
  {
    path:'merchants',component:MerchantsComponent
  },
  {
    path:'merchants/:merchantCode',component:MerchantComponent
  },
  {
    path:'merchants/:merchantCode/stores',component:StoreComponent
  },
  {
    path:'merchants/:merchantCode/stores/:storeCode',component:UpdateStoreComponent
  },
  {
    path:'merchants/:merchantCode/stores/:storeCode',component:StoreDetailsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

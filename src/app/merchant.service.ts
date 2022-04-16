import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

constructor(
  private http:HttpClient
) { }
public GetMerchants()
{
  return this.http.get<any>('https://localhost:7016/api/merchants');
}
public getMerchantbyId(merchantCode:string)
{
  return this.http.get('https://localhost:7016/api/merchants/'+merchantCode);
}
public createMerchant(data:any)
{
  return this.http.post<any>('https://localhost:7016/api/merchants',data);
 
}
public UpdateMerchant(merchantCode:string,body:any)
{
  return this.http.put('https://localhost:7016/api/merchants/'+merchantCode,body);
}
public DeleteMerchant(merchantCode:string)
{
  return this.http.delete('https://localhost:7016/api/merchants/'+merchantCode);
}
public GetStoresByMerchantId(merchantCode:string)
{
  return this.http.get('https://localhost:7016/api/merchants/'+merchantCode+'/stores');
}
public createStore(data:any)
{
  return this.http.post<any>('https://localhost:7016/api/merchants/:merchantCode/stores',data);
 
}
public getStores(merchantCode:string,storeCode:string)
{ 
  return this.http.get('https://localhost:7016/api/merchants/'+merchantCode+'/stores/'+storeCode);
}
public UpdateStore(storeCode:string,body:any)
{
  return this.http.put('https://localhost:7016/api/merchants/:merchantCode/stores/'+storeCode,body);
}
public DeleteStore(storeCode:string)
{
  return this.http.delete('https://localhost:7016/api/merchants/:merchantCode/stores/'+storeCode);
}
public GetStore(storeCode:string)
{
  return this.http.get('https://localhost:7016/api/stores/'+storeCode);
}
}

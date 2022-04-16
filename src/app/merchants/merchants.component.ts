import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MerchantService } from '../merchant.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateMerchantComponent } from '../createMerchant/createMerchant.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss']
})
export class MerchantsComponent implements OnInit {
  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['merchantCode', 'name', 'fullName', 'details', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public merchantService: MerchantService,
    private router: Router,
    private matDialog: MatDialog,
    public dialog:MatDialog

  ) { }

  ngOnInit(): void {
    this.merchantService.GetMerchants().subscribe((result: any) => {
      console.log("get merchants", result);
      this.dataSource.data = result.merchant;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialogClick() {
    this.matDialog.open(CreateMerchantComponent, {
      width: '500px',

    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.merchantService.GetMerchants().subscribe((result: any) => {
          console.log("get merchants", result);
          this.dataSource.data = result.merchant;
        });
      }
    })
  }


  public navigateToActions(merchantCode: string) {
    this.router.navigate(['merchants/' + merchantCode]);
  }
  public navigateToDetails(merchantCode: string) {
    this.router.navigate(['merchants/' + merchantCode + '/stores']);
  }
  

  openDialogToDelete(merchantCode:string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        console.log('The dialog was closed');
        this.merchantService.DeleteMerchant(merchantCode).subscribe(() => {
          const indexOfObjects=this.dataSource.data.findIndex((object:any)=>{
            return object.merchantCode==merchantCode;
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

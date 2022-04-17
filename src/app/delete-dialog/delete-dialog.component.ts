import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    public dialog:MatDialog,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
  ) { }

  ngOnInit() {
  }
 
  public onClick(): void {
    this.dialogRef.close(true);
  }
}

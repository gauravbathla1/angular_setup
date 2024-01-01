import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemDetailComponent } from '../item-detail/item-detail.component';

@Component({
  selector: 'app-images-modal',
  templateUrl: './images-modal.component.html',
  styleUrls: ['./images-modal.component.scss']
})
export class ImagesModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ItemDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matdialog: MatDialog,
  ) {
   
 }  
 ngOnInit(){
  console.log(this.data,'data');
  
 }
}

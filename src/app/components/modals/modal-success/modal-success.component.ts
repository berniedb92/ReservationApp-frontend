import { Component, OnInit, Inject } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-success',
  templateUrl: './modal-success.component.html',
  styleUrls: ['./modal-success.component.css']
})
export class ModalSuccessComponent implements OnInit {

  message = ''

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<ModalSuccessComponent>) { }

  ngOnInit(): void {
    this.message = this.data
  }

  close() {
    this.dialogRef.close();
  }

}

import { FormControl, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent implements OnInit {

  message = ''

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
  public dialogRef: MatDialogRef<ModalConfirmComponent>) { }

  ngOnInit(): void {
    this.message = this.data
  }

  close(action: string) {
    this.dialogRef.close(action)
  }

}

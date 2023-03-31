import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-set-availability',
  templateUrl: './modal-set-availability.component.html',
  styleUrls: ['./modal-set-availability.component.css']
})
export class ModalSetAvailabilityComponent implements OnInit {

  numero = 0

  constructor(@Inject(MAT_DIALOG_DATA) public data: number,
  public dialogRef: MatDialogRef<ModalSetAvailabilityComponent>) { }

  ngOnInit(): void {
    this.numero = this.data
  }

}

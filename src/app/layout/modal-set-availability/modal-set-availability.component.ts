import { DisponibilitaCampo } from 'src/app/model/DisponibilitaCampo';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtenteAnonimoService } from 'src/service/utente-anonimo.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Costants } from 'src/app/common/constants';

@Component({
  selector: 'app-modal-set-availability',
  templateUrl: './modal-set-availability.component.html',
  styleUrls: ['./modal-set-availability.component.scss']
})
export class ModalSetAvailabilityComponent implements OnInit {

  numero = 0
  disponibilitaObj: DisponibilitaCampo[] = []
  disponibilitaCampo: any[] = []
  dispForm: FormGroup = {} as FormGroup;
  dateSelect: Date = new Date()
  message = ''

  get disponibilita() {
    return this.dispForm.controls
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: number,
  public dialogRef: MatDialogRef<ModalSetAvailabilityComponent>, private service: UtenteAnonimoService) { }

  ngOnInit(): void {
    this.generateForm()
    this.numero = this.data
    this.dispSelect()
    this.service.selDisponibilitaDate(this.numero, this.dateSelect.toISOString().split('T')[0]).subscribe({
      next: (response) => {
        console.log(response)
        this.disponibilitaObj = response
        let parse = JSON.parse(response[0].disponibilita)
        // this.disponibilitaCampo = parse
        console.log(parse)
      },
      error: (error) => {
        this.message = error
      }
    })
  }

  dispSelect() {
    switch(this.numero) {
      case 1:
        this.disponibilitaCampo = Costants.slotTimeCampo1
        break
      case 2:
        this.disponibilitaCampo = Costants.slotTimeCampo2
        break
      case 3:
        this.disponibilitaCampo = Costants.slotTimePadel
        break
    }

  }

  generateForm() {
    this.dispForm = new FormGroup({
      id: new FormControl(''),
      // oraInizio: new FormControl(''),
      // oraFine: new FormControl(''),
      // availability: new FormControl('')
    })
  }

  save(){
    console.log(this.disponibilita['id']!.value)
  }

  close() {
    this.dialogRef.close()
  }
}

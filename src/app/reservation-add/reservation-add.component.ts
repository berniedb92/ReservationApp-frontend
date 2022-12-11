import { UtenteAnonimoService } from './../service/utente-anonimo.service';
import { Sport } from './../model/sport';
import { Component, Input, OnInit } from '@angular/core';
import { Campo } from '../model/campo';
import { Cliente } from '../model/cliente';
import { Prenotazione } from '../model/prenotazione';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { GlobalFunctions } from '../common/global-functions';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Tesseramento } from '../model/tesseramento';
@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.css']
})
export class ReservationAddComponent implements OnInit {
 var:any;
  timeSelect: any[] = ['8:00', '9:00', '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00'
  ]

  prenotazione: Prenotazione = new Prenotazione();
  campi: Campo[] = []

  tesserati :Tesseramento[] =[];
  registerReservationForm: FormGroup = {} as FormGroup;
  errore:string="";

  constructor(private service: UtenteAnonimoService) { 
  
  }
  

  ngOnInit(): void {
   this.service.listaCampi().subscribe(data => {this.campi=data})

   this.service.selTesserati().subscribe(data =>{this.tesserati=data});
    console.log("TESSERATI",this.tesserati);
   this.generateForm();
   console.log("Valore Form",this.registerReservationForm)
  }


  generateForm(){
  this.registerReservationForm = new FormGroup({
      dateReservation: new FormControl(this.prenotazione.data, [Validators.required,GlobalFunctions.validateDate()]),
      oraInizio: new FormControl(this.prenotazione.oraInizio, [GlobalFunctions.validateDate(), Validators.required]), // dateStudent is the function to bind custom error
      oraFine: new FormControl(this.prenotazione.oraFine, [Validators.required]),
      modality: new FormControl(this.prenotazione.modalita,[Validators.required]),
      campo: new FormControl(this.prenotazione.campo, [Validators.required,]),
      playerOne: new FormControl(this.prenotazione.giocatore1, [Validators.required]),
      playerTwo: new FormControl(this.prenotazione.giocatore2, [Validators.pattern("^[0-9]*")]),
      playerThree: new FormControl(this.prenotazione.giocatore3? this.prenotazione.giocatore3: null, [Validators.required]),
      playerFour: new FormControl(this.prenotazione.giocatore4? this.prenotazione.giocatore4: null, [Validators.required])
    });
     


}
get reservation() { return this.registerReservationForm.controls};

inserimento(){
  this.prenotazione.data = this.reservation['dateReservation'].value;
  this.prenotazione.oraInizio = this.reservation['oraInizio'].value;
  this.prenotazione.oraFine = this.reservation['oraFine'].value;
  this.prenotazione.modalita = this.reservation['modality'].value;
  this.prenotazione.campo = this.reservation['campo'].value;
  this.prenotazione.giocatore1 = this.reservation['playerOne'].value;
  this.prenotazione.giocatore2 = this.reservation['playerTwo'].value;
  this.prenotazione.giocatore3 = this.reservation['playerThree'].value;
  this.prenotazione.giocatore4 = this.reservation['playerFour'].value;
  
  const tempoInizio = moment(this.prenotazione.data).add( this.reservation['oraInizio'].value,'hour');
  const tempoFine = moment(this.prenotazione.data).add( this.reservation['oraFine'].value,'hour'); 

  const campo = this.campi.filter(z => z.numero ==this.reservation['campo'].value );
  const giocatore1 = this.tesserati.filter(t=> t.codiceTessera == this.reservation['playerOne'].value);
  const giocatore2 = this.tesserati.filter(t=> t.codiceTessera == this.reservation['playerTwo'].value);
  const giocatore3 = this.tesserati.filter(t=> t.codiceTessera == this.reservation['playerThree'].value);
  const giocatore4 = this.tesserati.filter(t=> t.codiceTessera == this.reservation['playerFour'].value);
  
  this.prenotazione.oraInizio = new Date (tempoInizio.toDate());
  this.prenotazione.oraFine = new Date (tempoFine.toDate());
 
  this.prenotazione.campo = campo[0];
 
  this.prenotazione.giocatore1 = giocatore1[0];
  this.prenotazione.giocatore2 = giocatore2[0];
  this.prenotazione.giocatore3 = giocatore3[0];
  this.prenotazione.giocatore4 = giocatore4[0];

  this.prenotazione.codicePrenotazione = Number(Math.floor(Math.random()*10000));
  console.log(this.prenotazione.codicePrenotazione,"Random")
  this.service.insertPrenotazione(this.prenotazione).subscribe({
      next:(response)=>{
       response.campo= this.prenotazione.campo;
        console.log("PREnotazione",this.prenotazione);
      },
      error:(error)=>{
 this.errore =error.error.message;

       console.log( "ERROREEEE",this.errore)
      }
  })
  }
}

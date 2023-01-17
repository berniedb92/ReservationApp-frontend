import { Tesseramento } from './../model/tesseramento';
import { UtenteAnonimoService } from './../service/utente-anonimo.service';
import { Component, Input, OnInit } from '@angular/core';
import { Campo } from '../model/campo';
import { Cliente } from '../model/cliente';
import { Prenotazione } from '../model/prenotazione';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { GlobalFunctions } from '../common/global-functions';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.css']
})
export class ReservationAddComponent implements OnInit {
  var: any;
  timeSelect: any[] = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
  timeSelect2: any[] = ['8:30', '9:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30', '17:30', '18:30', '19:30', '20:30', '21:30', '22:30', '23:30']
  timeSelectPadel: any[] = ['8:00', '9:30', '11:00', '12:30', '14:00', '15:30', '17:00', '18:30', '20:00', '21:30', '23:00']

  prenotazione: Prenotazione = new Prenotazione();
  campi: Campo[] = []
  router: string = "";
  tesserati: Tesseramento[] = [];
  registerReservationForm: FormGroup = {} as FormGroup;
  errore: string = "";
  tessere: Tesseramento[] = [];
  tessere2: Tesseramento[] = [];
  tessere3: Tesseramento[] = [];
  tessere4: Tesseramento[] = [];
  tessereCopy: Tesseramento[] = [];
  giocatore1!: number;
  giocatore2!: number;
  giocatore3!: number;
  giocatore4!: number;



  isJqueryWorking: any;

  constructor(private service: UtenteAnonimoService, private route: Router) { }


  ngOnInit(): void {
    this.service.listaCampi().subscribe(data => { this.campi = data })

    this.service.selTesserati().subscribe(data => { this.tesserati = data });
    console.log("TESSERATI", this.tesserati);
    this.generateForm();

    // this.service.selTesseratoCognome('').subscribe(
    //   resp => {
    //     this.tessere = resp
    //     this.tessereCopy = this.tessere
    //   }
    // )

    console.log("ROTta", this.service.router);
    console.log("Valore Form", this.registerReservationForm)

    $(document).ready(() => {
      this.isJqueryWorking = 'Jquery is working !!!';
    });

  }

  generateForm() {

    this.registerReservationForm = new FormGroup({
      dateReservation: new FormControl(this.prenotazione.data, [Validators.required, GlobalFunctions.validateDate()]),
      oraInizio: new FormControl(this.prenotazione.oraInizio, [GlobalFunctions.validateDate(), Validators.required]),
      oraFine: new FormControl(this.prenotazione.oraFine, [Validators.required]),
      modality: new FormControl(this.prenotazione.modalita, [Validators.required]),
      campo: new FormControl(this.prenotazione.campo, [Validators.required,]),
      playerOne: new FormControl(this.prenotazione.giocatore1, [Validators.required]),
      playerTwo: new FormControl(this.prenotazione.giocatore2, [Validators.pattern("^[0-9]*")]),
      playerThree: new FormControl(this.prenotazione.giocatore3 ? this.prenotazione.giocatore3 : null, [Validators.required]),
      playerFour: new FormControl(this.prenotazione.giocatore4 ? this.prenotazione.giocatore4 : null, [Validators.required]),
      event: new FormControl(this.prenotazione.evento ? this.prenotazione.evento : null, [Validators.required]),
      evento: new FormControl('undefined' ? 'prenotazione' : 'evento', [Validators.required])
    });

  }

  get reservation() { return this.registerReservationForm.controls };

  inserimento() {

    this.prenotazione.data = this.reservation['dateReservation'].value;
    this.prenotazione.oraInizio = this.reservation['oraInizio'].value;
    this.prenotazione.oraFine = this.reservation['oraFine'].value;
    this.prenotazione.modalita = this.reservation['modality'].value;
    this.prenotazione.campo = this.reservation['campo'].value;
    // this.prenotazione.giocatore1 = this.reservation['playerOne'].value;
    // this.prenotazione.giocatore2 = this.reservation['playerTwo'].value;
    this.prenotazione.giocatore3 = this.reservation['playerThree'].value;
    this.prenotazione.giocatore4 = this.reservation['playerFour'].value;
    this.prenotazione.evento = this.reservation['event'].value;

    if (this.prenotazione.evento != null) {
      this.prenotazione.modalita = 'evento';
    }

    const tempoInizio = moment(this.prenotazione.data).add(this.reservation['oraInizio'].value, 'hour');
    const tempoFine = moment(this.prenotazione.data).add(this.reservation['oraFine'].value, 'hour');

    const campo = this.campi.filter(z => z.numero == this.reservation['campo'].value);
    const giocatore1 = this.tesserati.filter(t => t.codiceTessera == this.giocatore1);
    const giocatore2 = this.tesserati.filter(t => t.codiceTessera == this.giocatore2);
    const giocatore3 = this.tesserati.filter(t => t.codiceTessera == this.giocatore3);
    const giocatore4 = this.tesserati.filter(t => t.codiceTessera == this.giocatore4);

    this.prenotazione.oraInizio = new Date(tempoInizio.toDate());
    this.prenotazione.oraFine = new Date(tempoFine.toDate());

    this.prenotazione.campo = campo[0];

    this.prenotazione.giocatore1 = giocatore1[0];
    this.prenotazione.giocatore2 = giocatore2[0];
    this.prenotazione.giocatore3 = giocatore3[0];
    this.prenotazione.giocatore4 = giocatore4[0];

    this.prenotazione.codicePrenotazione = Number(Math.floor(Math.random() * 10000));
    console.log(this.prenotazione.codicePrenotazione, "Random")
    this.service.insertPrenotazione(this.prenotazione).subscribe({
      next: (response) => {

        console.log("PREnotazione", this.prenotazione);
      },
      error: (error) => {
        this.errore = error.error.message;

        console.log("ERROREEEE", this.errore)
      }
    })
  }

  r: number = 0;

  onTypeCognome(cognome: string, type: string) {
    this.service.selTesseratoCognome(cognome).subscribe(
      {
        next: (response) => {
          console.log(cognome)

          switch (type) {
            case 'playerOne':
              if (cognome.length >= 3) {
                this.tessere = response;
                this.tessereCopy = this.tessere
                this.tessereCopy = this.tessere.filter(x => x.clienteTess.cognome.includes(cognome.toLowerCase()));
                this.r = cognome.length
              }

              if (cognome.length < this.r) {
                this.tessere = []
              }

              break;
            case 'playerTwo':
              if (cognome.length >= 3) {
                this.tessere2 = response;
                this.tessereCopy = this.tessere2
                this.tessereCopy = this.tessere2.filter(x => x.clienteTess.cognome.includes(cognome.toLowerCase()));
                this.r = cognome.length
              }

              if (cognome.length < this.r) {
                this.tessere2 = []
              }
              break;
            case 'playerThree':
              if (cognome.length >= 3) {
                this.tessere3 = response;
                this.tessereCopy = this.tessere3
                this.tessereCopy = this.tessere3.filter(x => x.clienteTess.cognome.includes(cognome.toLowerCase()));
                this.r = cognome.length
              }

              if (cognome.length < this.r) {
                this.tessere3 = []
              }
              break;
            case 'playerFour':
              if (cognome.length >= 3) {
                this.tessere4 = response;
                this.tessereCopy = this.tessere4
                this.tessereCopy = this.tessere4.filter(x => x.clienteTess.cognome.includes(cognome.toLowerCase()));
                this.r = cognome.length
              }

              if (cognome.length < this.r) {
                this.tessere4 = []
              }
              break;
          }

        },
        error: (error) => {
          console.log(error);
          switch (type) {
            case 'playerOne':
              this.tessere = []


              break;
            case 'playerTwo':

              this.tessere2 = []

              break;
            case 'playerThree':

              this.tessere3 = []

              break;
            case 'playerFour':
              this.tessere4 = []

              break;
          }
        }
      }
    )
  }

  radioChecked(id: string, form: any, n: number) {
    console.log(id)
    console.log(form)

    switch (form) {
      case 'playerOne':
        this.giocatore1 = n
        this.registerReservationForm.patchValue({
          playerOne: id
        });
        break;
      case 'playerTwo':
        this.giocatore2 = n
        this.registerReservationForm.patchValue({
          playerTwo: id
        });
        break;
        case 'playerThree':
        this.giocatore3 = n
        this.registerReservationForm.patchValue({
          playerThree: id
        });
        break;
      case 'playerFour':
        this.giocatore4 = n
        this.registerReservationForm.patchValue({
          playerFour: id
        });
        break;
    }

  }
}

import { Tesseramento } from './../model/tesseramento';
import { UtenteAnonimoService } from './../service/utente-anonimo.service';
import { Component, Input, OnInit } from '@angular/core';
import { Campo } from '../model/campo';
import { Prenotazione } from '../model/prenotazione';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { GlobalFunctions } from '../common/global-functions';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { CostantsTime } from '../common/constants';

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.css']
})


export class ReservationAddComponent implements OnInit {

  prenotazione: Prenotazione = new Prenotazione();
  campi: Campo[] = []
  router: string = "";
  tesserati: Tesseramento[] = [];
  registerReservationForm: FormGroup = {} as FormGroup;
  registerReservationForm2: FormGroup = {} as FormGroup;
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

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  timeInizio: any[] = []
  timeFine: any[] = []

  timeInizio1: any[] = CostantsTime.timeInizio1
  timeFine1: any[] = CostantsTime.timeFine1
  timeInizio2: any[] = CostantsTime.timeInizio2
  timeFine2: any[] = CostantsTime.timeFine2
  timeInizioPadel: any[] = CostantsTime.timeInizioPadel
  timeFinePadel: any[] = CostantsTime.timeFinePadel

  saveDateIn = ''
  saveDatefi = ''

  constructor(private service: UtenteAnonimoService, private route: Router, private _formBuilder: FormBuilder) { }


  ngOnInit(): void {
    // this.timeInizio = this.timeInizio1
    // this.timeFine = this.timeFine1
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

  }

  generateForm() {

    this.registerReservationForm = new FormGroup({
      dateReservation: new FormControl(this.prenotazione.data, [Validators.required, GlobalFunctions.validateDate()]),
      oraInizio: new FormControl(this.prenotazione.oraInizio, [GlobalFunctions.validateDate(), Validators.required]),
      oraFine: new FormControl(this.prenotazione.oraFine, [Validators.required]),
      campo: new FormControl('1', [Validators.required,])
    });

    this.registerReservationForm2 = new FormGroup({
      modality: new FormControl('singolo', [Validators.required]),
      playerOne: new FormControl(this.prenotazione.giocatore1, [Validators.required]),
      playerTwo: new FormControl(this.prenotazione.giocatore2, [Validators.pattern("^[0-9]*")]),
      playerThree: new FormControl(this.prenotazione.giocatore3 ? this.prenotazione.giocatore3 : null, [Validators.required]),
      playerFour: new FormControl(this.prenotazione.giocatore4 ? this.prenotazione.giocatore4 : null, [Validators.required])
    });

  }

  get reservation() { return this.registerReservationForm.controls };
  get reservation2() { return this.registerReservationForm2.controls };

  dateGenerate(a: any) {
    var date = new Date()
    date.setHours(Number(a.split(':')[0]))
    date.setMinutes(Number(a.split(':')[1]))
    date.setSeconds(0)

    return date
  }

  value: Date = new Date()
  inserimenti() {
    this.prenotazione.data = this.reservation['dateReservation'].value;
    this.prenotazione.oraInizio = this.dateGenerate(this.a)
    this.prenotazione.oraFine = this.dateGenerate(this.b)
    this.prenotazione.campo = this.reservation['campo'].value;

    console.log('this',this.prenotazione)
  }


  inserimento() {

    //this.prenotazione.data = this.reservation['dateReservation'].value;
    console.log(this.reservation['oraInizio'].value)
    var dateTime1 = new Date()
    dateTime1.setTime(this.reservation['oraInizio'].value.split(':')[0])
    dateTime1.setSeconds(this.reservation['oraInizio'].value.split(':')[1])
    console.log(dateTime1)

    var dateTime2 = new Date()
    dateTime2.setTime(this.reservation['oraFine'].value)

    this.prenotazione.oraInizio = dateTime1
    this.prenotazione.oraFine = dateTime2
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
    console.log('prenotazione', this.prenotazione)
    // this.service.insertPrenotazione(this.prenotazione).subscribe({
    //   next: (response) => {

    //     console.log("PREnotazione", this.prenotazione);
    //   },
    //   error: (error) => {
    //     this.errore = error.error.message;

    //     console.log("ERROREEEE", this.errore)
    //   }
    // })
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

  startDate = new Date()
  selectionDate = new Date()
  maxDate = new Date(2023, 0o3, 0o1)
  minDate = new Date(this.startDate.setDate(this.startDate.getDate() - 1))

  dateFilter = (d: any): boolean => {
    var calendar_date = []


    calendar_date.push(d)
    if (calendar_date == undefined) return false;

    return true
  };

  handleSelection(event: Date) {

    this.selectionDate = new Date(event.setDate(event.getDate() - 1))

    this.prenotazione.data = this.selectionDate
    console.log(this.selectionDate)
  }

  campo = 0
  changeTime(value: any) {
    console.log(value)
    switch (value) {
      case '1':
        this.timeInizio = this.timeInizio1
        this.timeFine = this.timeFine1
        this.campo = 1
        break
      case '2':
        this.timeInizio = this.timeInizio2
        this.timeFine = this.timeFine2
        this.campo = 2
        break
      case '3':
        this.timeInizio = this.timeInizioPadel
        this.timeFine = this.timeFinePadel
        this.campo = 3
        break
    }
    console.log(this.timeInizio)
    console.log(this.timeFine)
  }

  index = 0
  a = ''
  chipsSelInizio(value: any) {
    console.log(value)
    this.saveDateIn = value
    this.a = value.ora
    if (!value.selected) {

      for (let i = 0; i < this.timeInizio.length; i++) {

        this.timeInizio[i] = {
          ora: this.timeInizio[i].ora,
          selected: false,
          disabled: true
        }

        if (this.timeInizio[i].ora === value.ora) {

          this.timeInizio[i] = {
            ora: this.timeInizio[i].ora,
            selected: true,
            disabled: false
          }

          this.index = i + 1
        }
      }
      for (let j = 0; j < this.timeFine.length; j++) {

        this.timeFine[j] = {
          ora: this.timeFine[j].ora,
          selected: false,
          disabled: true
        }

        if (this.timeFine[j].ora === value.ora) {

          var max = this.index + 1

          if(this.campo === 3) max = this.index

          for (let x = this.index; x <= max; x++) {

            this.timeFine[x] = {
              ora: this.timeFine[x].ora,
              selected: false,
              disabled: false
            }
            j++;
          }
        }
      }
      console.log('fineeeee', this.timeFine)
    } else {
      this.timeInizio = CostantsTime.resetTimeInizio(this.campo)
      this.timeFine = CostantsTime.resetTimeFine(this.campo)
    }
  }

  b = ''
  chipsSelFine(value: any) {
    this.saveDatefi = value
    this.b = value.ora
    if (!value.selected) {

      for (let i = 0; i < this.timeFine.length; i++) {

        this.timeFine[i] = {
          ora: this.timeFine[i].ora,
          selected: false,
          disabled: true
        }

        if (this.timeFine[i].ora == value.ora) {

          this.timeFine[i] = {
            ora: this.timeFine[i].ora,
            selected: true,
            disabled: false
          }

        }
      }
    } else {
      if(this.campo === 3) {
        CostantsTime.resetTimeInizio(this.campo)
      } else {
        this.chipsSelInizio(this.saveDateIn)
      }
    }
  }

  changeRadio(radio: any) {
    console.log(radio)
  }

}


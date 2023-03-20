import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { GlobalFunctions } from 'src/app/common/global-functions';
import { Campo } from 'src/app/model/campo';
import { Prenotazione } from 'src/app/model/prenotazione';
import { Tesseramento } from 'src/app/model/tesseramento';
import { UtenteAnonimoService } from 'src/app/service/utente-anonimo.service';

interface Chips {
  ora: string,
  disabled: boolean,
  selected: boolean
}

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.scss']
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
  error = ''

  orario: any[] = []
  disponibilita: any[] = []

  startDate = new Date()
  selectionDate = new Date()
  maxDate = new Date("2023-03-26")
  minDate = new Date()
  selectedChips = false
  campoDisp: number = 1

  constructor(private service: UtenteAnonimoService, private route: Router, private _formBuilder: FormBuilder) { }


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

    this.service.selDisponibilità(this.campoDisp, this.startDate.toISOString().split('T')[0]).subscribe({
      next: (result) => {
        console.log(result)
        console.log('dispp', result[0].disponibilita)
        let parse = JSON.parse(result[0].disponibilita)
        console.log('parse', parse)

        this.minDate = result[0].giorno
        this.disponibilita = parse
        this.orario = this.chipsgenerate()


        console.log('parse', this.orario)

      },
      error: (error) => {
        console.log('dispp', error)
        this.error = error.error.message
      }
    })

    console.log("ROTta", this.service.router);
    console.log("Valore Form", this.registerReservationForm)

  }

  getDisponibilita(numero: number, data: string) {
    this.orario = []
    this.disponibilita = []
    this.error = ''
    this.service.selDisponibilità(numero, data).subscribe({
      next: (result) => {
        console.log(result)
        console.log('dispp', result[0].disponibilita)
        let parse = JSON.parse(result[0].disponibilita)
        console.log('parse', parse)

        this.minDate = result[0].giorno
        this.disponibilita = parse
        this.orario = this.chipsgenerate()


        console.log('parse', this.orario)

      },
      error: (error) => {
        console.log('dispp', error)
        this.error = error.error.message

      }
    })
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
   //this.prenotazione.oraInizio = this.dateGenerate(this.a)
    //this.prenotazione.oraFine = this.dateGenerate(this.b)
    this.prenotazione.campo = this.reservation['campo'].value;

    console.log('this', this.prenotazione)
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

  dateFilter = (d: any): boolean => {
    var calendar_date = []


    calendar_date.push(d)
    if (calendar_date == undefined) return false;

    return true
  };

  handleSelection(event: Date) {
    console.log(event)
    this.selectionDate = event
    this.getDisponibilita(this.campoDisp, event.toISOString().split('T')[0])
    console.log(this.selectionDate)
  }

  chipsgenerate() {
    var selected = []

    for(let i = 0; i < this.disponibilita.length; i++) {
      if(this.disponibilita[i].available) {
        selected.push({
          ora: `${this.disponibilita[i].oraInizio} - ${this.disponibilita[i].oraFine}`,
          disabled: false,
          selected: false
        })
      }
    }
    return selected
  }

  selectChip(event: any) {
    console.log(event)
    var selected = []

    this.selectedChips = false

    for(let i = 0; i < this.orario.length; i++) {
      console.log(this.orario[i].ora === event.ora)

      if(this.orario[i].selected) {
        this.selectedChips = true
        this.orario = this.chipsgenerate()
        break
      }

      if(this.orario[i].ora === event.ora) {
        selected.push({
          ora: this.orario[i].ora,
          disabled: false,
          selected: true
        })
      } else {
        selected.push({
          ora: this.orario[i].ora,
          disabled: true,
          selected: false
        })
      }
    }
    if(!this.selectedChips) this.orario = selected
    console.log(selected)
  }

  changeCampo(radio: any) {
    this.campoDisp = radio.value
    this.getDisponibilita(radio.value, this.selectionDate.toISOString().split('T')[0])
  }


  changeRadio(radio: any) {
    console.log(radio)
  }



}


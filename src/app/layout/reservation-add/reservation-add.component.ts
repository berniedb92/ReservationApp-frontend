import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, map, startWith } from 'rxjs';
import { GlobalFunctions } from 'src/app/common/global-functions';
import { ModalErrorComponent } from 'src/app/components/modals/modal-error/modal-error.component';
import { ModalSuccessComponent } from 'src/app/components/modals/modal-success/modal-success.component';
import { Prenotazione } from 'src/app/model/Prenotazione';
import { Utente } from 'src/app/model/Utente';
import { Campo } from 'src/app/model/campo';
import { Ruoli } from 'src/app/model/Ruoli';
import { Tesseramento } from 'src/app/model/tesseramento';
import { AuthJwtService } from 'src/service/authJwt.service';
import { JwtRolesService } from 'src/service/jwt-roles.service';
import { UtenteAnonimoService } from 'src/service/utente-anonimo.service';

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
  // tessere: Tesseramento[] = [];
  // tessere2: Tesseramento[] = [];
  // tessere3: Tesseramento[] = [];
  // tessere4: Tesseramento[] = [];
  tessereCopy: Tesseramento[] = [];
  // giocatore1!: number;
  // giocatore2!: number;
  // giocatore3!: number;
  // giocatore4!: number;
  idselectedDate!: number


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

  tesseraG1!: Observable<Tesseramento[]>;
  tesseraG2!: Observable<Tesseramento[]>;
  tesseraG3!: Observable<Tesseramento[]>;
  tesseraG4!: Observable<Tesseramento[]>;
  aComplete1 = new FormControl('');
  aComplete2 = new FormControl('');
  aComplete3 = new FormControl('');
  aComplete4 = new FormControl('');
  isAdmin = false
  user!: Utente;

  get reservation() { return this.registerReservationForm.controls };
  get reservation2() { return this.registerReservationForm2.controls };

  constructor(
    private service: UtenteAnonimoService,
    private route: Router,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private roles: JwtRolesService,
    private auth: AuthJwtService
  ) { }


  ngOnInit(): void {

    this.generateForm();

    this.isAdmin = (this.roles.getRoles().indexOf(Ruoli.amministratore) > -1) ? true : false;

    if(this.isAdmin) {

      var userLogged = this.auth.loggedUser()
      console.log('userLogged', userLogged)

      this.service.selTesseratoUser(userLogged!).subscribe({
        next: (result) => {
          this.aComplete1.setValue(result);
          this.aComplete1.disable()
        }
      })
    }

    this.service.listaCampi().subscribe(
      data => {
        this.campi = data
      })

    this.service.selTesserati().subscribe(
      data => {
        this.tesserati = data
      });

    this.generateAutocomplete('playerOne')

    this.service.selDisponibilita(this.campoDisp).subscribe({
      next: (result) => {
        this.minDate = new Date(result[0].giorno)
        this.maxDate = new Date(result[result.length - 1].giorno)
      },
      error: (error) => {
        console.log(error)
      }
    })

    this.service.selDisponibilitaDate(this.campoDisp, this.minDate.toISOString().split('T')[0]).subscribe({
      next: (result) => {
        let parse = JSON.parse(result[0].disponibilita)

        this.disponibilita = parse
        this.orario = this.chipsgenerate()

      },
      error: (error) => {
        console.log('dispp', error)
        this.error = error
      }
    })

  }

  generateForm() {

    this.registerReservationForm = new FormGroup({
      dateReservation: new FormControl(this.prenotazione.data, [Validators.required, GlobalFunctions.validateDate()]),
      oraInizio: new FormControl(this.prenotazione.oraInizio, [GlobalFunctions.validateDate(), Validators.required]),
      oraFine: new FormControl(this.prenotazione.oraFine, [Validators.required]),
      campo: new FormControl('1', [Validators.required,]),
      modality: new FormControl('singolo', [Validators.required]),
    });

    this.registerReservationForm2 = new FormGroup({
      playerOne: new FormControl(this.prenotazione.giocatore1, [Validators.required]),
      playerTwo: new FormControl(this.prenotazione.giocatore2, [Validators.pattern("^[0-9]*")]),
      playerThree: new FormControl(this.prenotazione.giocatore3 ? this.prenotazione.giocatore3 : null, [Validators.required]),
      playerFour: new FormControl(this.prenotazione.giocatore4 ? this.prenotazione.giocatore4 : null, [Validators.required])
    });

  }

  generateAutocomplete(giocatore: string) {
    switch (giocatore) {
      case 'playerOne':
        this.tesseraG1 = this.aComplete1.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        )
        break
      case 'playerTwo':

        this.tesseraG2 = this.aComplete2.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        )
        break
      case 'playerThree':
        this.tesseraG3 = this.aComplete3.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        )
        break
      case 'playerFour':
        this.tesseraG4 = this.aComplete4.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        )
        break
    }

  }

  displayAutocomplete(option: Tesseramento) {
    return option.clienteTess.cognome + ' ' + option.clienteTess.nome
  }

  private _filter(value: string): Tesseramento[] {
    return this.tesserati.filter(option => option.clienteTess.cognome.toLowerCase().includes(value.toLowerCase()));
  }

  getDisponibilita(numero: number, data: string) {
    this.orario = []
    this.disponibilita = []
    this.error = ''
    this.service.selDisponibilitaDate(numero, data).subscribe({
      next: (result) => {
        let parse = JSON.parse(result[0].disponibilita)

        this.disponibilita = parse
        this.orario = this.chipsgenerate()

      },
      error: (error) => {
        console.log('dispp', error)
        this.error = error

      }
    })
  }

  getDateDisonibilita(numero: number) {
    this.service.selDisponibilita(numero).subscribe({
      next: (result) => {
        this.minDate = this.startDate
        this.maxDate = new Date(result[result.length - 1].giorno)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  dateGenerate(a: any) {
    var date = new Date()
    date.setHours(Number(a.split(':')[0]))
    date.setMinutes(Number(a.split(':')[1]))
    date.setSeconds(0)

    return date
  }

  inserimenti() {

    this.prenotazione.data = this.selectionDate;

    this.prenotazione.oraInizio = this.dateGenerate(this.disponibilita[this.idselectedDate].oraInizio)
    this.prenotazione.oraFine = this.dateGenerate(this.disponibilita[this.idselectedDate].oraFine)

    this.reservation['dateReservation'].setValue(this.prenotazione.data);
    this.reservation['oraInizio'].setValue(this.prenotazione.oraInizio);
    this.reservation['oraFine'].setValue(this.prenotazione.oraFine);

    const campo = this.campi.filter(z => z.numero == this.reservation['campo'].value);

    this.prenotazione.campo = campo[0]
    this.prenotazione.modalita = this.reservation['modality']?.value;
  }

  inserimento() {

    if(this.prenotazione.campo.numero === 3) this.prenotazione.modalita = 'doppio'

    if(this.prenotazione.modalita = 'doppio') {
      alert('entra qui dio lupo')
      this.reservation2['playerThree'].patchValue(this.aComplete3.value);
      this.reservation2['playerFour'].patchValue(this.aComplete4.value);

      this.prenotazione.giocatore3 = this.reservation2['playerThree']?.value
      this.prenotazione.giocatore4 = this.reservation2['playerFour']?.value
    }

    this.reservation2['playerOne'].patchValue(this.aComplete1.value);
    this.reservation2['playerTwo'].patchValue(this.aComplete2.value);

    this.prenotazione.giocatore1 = this.reservation2['playerOne']?.value
    this.prenotazione.giocatore2 = this.reservation2['playerTwo']?.value

    this.prenotazione.codicePrenotazione = Number(Math.floor(Math.random() * 10000));

    if(this.prenotazione.campo.numero === 3) this.prenotazione.modalita = 'padel'
    console.log("PREnotazione", this.prenotazione);
  }

  save() {
    this.service.insertPrenotazione(this.prenotazione).subscribe({
      next: (response) => {
        console.log(response)
        const dialogRef = this.dialog.open(ModalSuccessComponent, { data: response.message });

        dialogRef.afterClosed().subscribe(() => {
          this.route.navigate(['reservation/' + this.prenotazione.campo.numero])
        });
        console.log("PREnotazione", this.prenotazione);
      },
      error: (error) => {
        console.log("ERROREEEE1", this.errore)
        console.log("PREnotazione", this.prenotazione);
        this.errore = error.error.message;

        const dialogRefErr = this.dialog.open(ModalErrorComponent, { data: error.message });

        dialogRefErr.afterClosed().subscribe(() => {
          // this.route.navigate(['reservation/' + this.prenotazione.campo.numero])
        });

        console.log("ERROREEEE2", this.errore)
      }
    })
  }

  dateFilter = (d: any): boolean => {
    var calendar_date = []


    calendar_date.push(d)
    if (calendar_date == undefined) return false;

    return true
  };

  handleSelection(event: Date) {
    console.log(event)
    let datemoment = moment(event).add(1, "day")
    this.selectionDate = event

    this.getDisponibilita(this.campoDisp, datemoment.toDate().toISOString().split('T')[0])
    console.log(this.selectionDate)
  }

  chipsgenerate() {
    var selected = []

    for (let i = 0; i < this.disponibilita.length; i++) {
      if (this.disponibilita[i].available) {
        selected.push({
          id: i,
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

    for (let i = 0; i < this.orario.length; i++) {

      if (this.orario[i].selected) {
        this.selectedChips = true
        this.orario = this.chipsgenerate()
        break
      }

      if (this.orario[i].ora === event.ora) {
        selected.push({
          id: i,
          ora: this.orario[i].ora,
          disabled: false,
          selected: true
        })
        this.idselectedDate = this.orario[i].id
      } else {
        selected.push({
          id: i,
          ora: this.orario[i].ora,
          disabled: true,
          selected: false
        })
      }
    }
    if (!this.selectedChips) this.orario = selected
    console.log(selected)
  }

  changeCampo(radio: any) {
    this.campoDisp = radio.value
    this.getDateDisonibilita(radio.value)
    this.getDisponibilita(radio.value, this.selectionDate.toISOString().split('T')[0])
  }


  changeRadio(radio: any) {
    console.log(radio)
  }



}


import { UtenteAnonimoService } from './../service/utente-anonimo.service';
import { Sport } from './../model/sport';
import { Component, OnInit } from '@angular/core';
import { Campo } from '../model/campo';
import { Cliente } from '../model/cliente';
import { Prenotazione } from '../model/prenotazione';

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.css']
})
export class ReservationAddComponent implements OnInit {

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
  clienti: Cliente[] = []
  campi: Campo[] = []
  sport: Sport[] = []

  constructor(private service: UtenteAnonimoService) { }

  ngOnInit(): void {
    this.service.listaClienti().subscribe(data => {this.clienti = data})
    this.service.listaCampi().subscribe(data => {this.campi=data})

  }

  onSubmit() {

  }

}

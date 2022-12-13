import { UtenteAnonimoService } from './../service/utente-anonimo.service';
import { Component, OnInit } from '@angular/core';
import { Prenotazione } from '../model/prenotazione';
import { Tesseramento } from '../model/tesseramento';

@Component({
  selector: 'app-reservation-day',
  templateUrl: './reservation-day.component.html',
  styleUrls: ['./reservation-day.component.css']
})
export class ReservationDayComponent implements OnInit {

  pageSize: number = 10;
  pageIndex: number = 1;
  prenotazioni: Prenotazione[] = []
  date = new Date()
  tesserati:any;

  constructor(private service: UtenteAnonimoService) { 
  
  }

  ngOnInit(): void {
    this.service.listaPrenotazioniDate(this.splitData(this.date)).subscribe(
      data => {
        this.prenotazioni = data;
      }
    )

    
  }

  splitData(data: Date): string {
    var split = data.toISOString().split('T')
    return split[0]
  }

}

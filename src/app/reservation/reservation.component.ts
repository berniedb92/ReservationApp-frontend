import { UtenteAnonimoService } from '../service/utente-anonimo.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Prenotazione } from '../model/prenotazione';
import { DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { ToastsComponent } from '../toasts/toasts.component';
import * as EventEmitter from 'events';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService]
})
export class ReservationComponent implements OnInit {

  pageSize: number = 10;
  pageIndex: number = 1;
  prenotazioni: Prenotazione[] = []
  addReservation = new Prenotazione();
 constructor(private service: UtenteAnonimoService) { }

  ngOnInit(): void {

    this.service.listaPrenotazioni().subscribe(
      data => {
        this.prenotazioni = data;
      
      }
    )
  }

 

}

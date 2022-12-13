import { UtenteAnonimoService } from '../service/utente-anonimo.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Prenotazione } from '../model/prenotazione';
import { DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { ToastsComponent } from '../toasts/toasts.component';
import * as EventEmitter from 'events';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService]
})
export class ReservationComponent implements OnInit {

  pageSize: number = 5;
  pageIndex: number = 1;
  prenotazioni: Prenotazione[] = []
  addReservation = new Prenotazione();
  rotta:string ="";
 constructor(private service: UtenteAnonimoService,private route:Router) {

this.service.setUrl(this.rotta);
  }

  ngOnInit(): void {

    this.service.listaPrenotazioni().subscribe(
      data => {
        this.prenotazioni = data;
      
      }
    )
    
   console.log("ROTta",this.service.router);
  }

 

}

import { UtenteAnonimoService } from '../service/utente-anonimo.service';
import { Component, OnInit } from '@angular/core';
import { Prenotazione } from '../model/prenotazione';
import { DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';

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
  public data: object[] = [{
    TravelId: 2,
    TravelSummary: 'Paris',
    DepartureTime: new Date(2022, 12, 3, 10, 0),
    ArrivalTime: new Date(2022, 12, 3, 12, 30),
    Source: 'London',
    Comments: 'Summer vacation planned for outstation.'
}];
  public selectedDate: Date = new Date();
  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    fields: {
        id: 'TravelId',
        subject: { name: 'TravelSummary', title: 'Summary', default: 'Add Summary' },
        location: { name: 'Source', default: 'ITA' },
        description: { name: 'Comments' },
        startTime: { name: 'DepartureTime' },
        endTime: { name: 'ArrivalTime' }
    }
};

  constructor(private service: UtenteAnonimoService) { }

  ngOnInit(): void {

    this.service.listaPrenotazioni().subscribe(
      data => {
        this.prenotazioni = data;
      }
    )
  }

}

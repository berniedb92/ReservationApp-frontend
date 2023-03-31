import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { UtenteAnonimoService } from 'src/service/utente-anonimo.service';
import { Prenotazione } from 'src/app/model/Prenotazione';
import { faTrash, faCalendarPlus, faAdd } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService]
})
export class ReservationComponent extends DataSource<Prenotazione> implements OnInit, AfterViewInit {

  pageSize: number = 5;
  pageIndex: number = 1;
  prenotazioni: Prenotazione[] = []
  addReservation = new Prenotazione();
  startDate = new Date()
  selectionDate = new Date()
  maxDate = new Date(2023, 0o3, 0o1)
  minDate = new Date(this.startDate.setDate(this.startDate.getDate()-1))
  error = ''
  faTrash = faTrash
  faCalendarPlus = faCalendarPlus
  faAdd = faAdd

  rotta: string = "";
  number = 1

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns = ['data', 'inizio', 'fine', 'modalita', '1', '2', 'campo', 'actions'];
  dataSource!: MatTableDataSource<any>;

  constructor(private service: UtenteAnonimoService, private route: Router, private activeRoute: ActivatedRoute) {
    super();
    this.dataSource = new MatTableDataSource()
    this.service.setUrl(this.rotta);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit(): void {

    this.activeRoute.params.subscribe(
      route => {
        this.error = ''
        this.prenotazioni = []
        this.dataSource.data = []
        let number = route['numero'] != undefined ? route['numero'] : 1
        this.service.listaPrenotazioniDateNumber(this.selectionDate.toISOString().split('T')[0], number).subscribe({
          next: (result) => {
            this.prenotazioni = result
            this.dataSource.data = this.prenotazioni
            console.log('resulttt')
          },
          error: (error) => {
            console.log("errorreeeee", error)
            this.error = error
          }
        })
      }
    )


    this.service.selDisponibilitaDate(this.number, this.startDate.toISOString().split('T')[0]).subscribe({
      next: (result) => {
        let parse = JSON.parse(result[0].disponibilita)
      },
      error: (error) => {
        console.log(error)
      }
    })

  }

  selectGiocatoriModalita1(prenotazione: Prenotazione): string {

    var cliente = ''
    if (prenotazione.evento != null) {
      cliente = prenotazione.evento
    } else if (prenotazione.modalita != 'evento') {
      cliente = prenotazione.modalita === 'singolo' ? prenotazione.giocatore1.clienteTess.nome + ' ' +
        prenotazione.giocatore1.clienteTess.cognome : prenotazione.giocatore1.clienteTess.nome + ' ' + prenotazione.giocatore1.clienteTess.cognome + ' - ' +
        prenotazione.giocatore3.clienteTess.nome + ' ' + prenotazione.giocatore3.clienteTess.cognome
    }

    return cliente
  }

  selectGiocatoriModalita2(prenotazione: Prenotazione): string {

    var cliente = ''

    if (prenotazione.modalita != 'evento') {
      cliente = prenotazione.modalita === 'singolo' ? prenotazione.giocatore2.clienteTess.nome + ' ' +
        prenotazione.giocatore2.clienteTess.cognome : prenotazione.giocatore2.clienteTess.nome + ' ' + prenotazione.giocatore2.clienteTess.cognome + ' - ' +
        prenotazione.giocatore4.clienteTess.nome + ' ' + prenotazione.giocatore4.clienteTess.cognome
    }

    return cliente
  }

  dateFilter = (d: any): boolean => {
    var calendar_date = []


    calendar_date.push(d)
    if (calendar_date == undefined) return false;

    return true
    //return calendar_date.
  };

  handleSelection(event: Date) {
    this.error =''
    var date = event
    this.service.listaPrenotazioniDateNumber(event.toISOString().split('T')[0], this.number).subscribe({
      next: (result) => {
        this.prenotazioni = result
        this.dataSource.data = this.prenotazioni
      },
      error: (error) => {
        this.prenotazioni = []
        this.dataSource.data = []
        console.log(error)
        this.error = error
      }
    })
    this.selectionDate = new Date(date.setDate(date.getDate()-1))
    console.log(this.selectionDate)
  }

  connect(): Observable<Prenotazione[]> {
    if (this.paginator && this.sort) {
      return merge(observableOf(this.dataSource), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.dataSource.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }


  disconnect(): void { }

  private getPagedData(data: Prenotazione[]): Prenotazione[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: Prenotazione[]): Prenotazione[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'targa': return compare(a.codicePrenotazione, b.codicePrenotazione, isAsc);
        case 'modello': return compare(a.evento, b.evento, isAsc);
        default: return 0;
      }
    });
  }

  goToDettagli(idReserve: number) {
    this.route.navigate(['/details-reservation'], {queryParams: {id:idReserve}})
  }

  deletePrenotazione(idReserve: number) {
    console.log(idReserve)
  }

}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

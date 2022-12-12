import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DettaglioPrenotazione } from '../model/dettagliPrenotazione';
import { UtenteAnonimoService } from '../service/utente-anonimo.service';

@Component({
  selector: 'app-details-reservation',
  templateUrl: './details-reservation.component.html',
  styleUrls: ['./details-reservation.component.css']
})
export class DetailsReservationComponent implements OnInit {

  pageSize: number = 10;
  pageIndex: number = 1;
  dettaglioPrenotazioni: DettaglioPrenotazione[] = []

  constructor(private service: UtenteAnonimoService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    if(id){
      this.getDetailsReservation(id);
      
    }

  }

  getDetailsReservation(id: any) {
    this.service.getDettagliPrenotazione(id).subscribe(
      data => {
        this.dettaglioPrenotazioni = data;
      }
    )
  }

}


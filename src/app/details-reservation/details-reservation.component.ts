import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DettaglioPrenotazione } from '../model/dettagliPrenotazione';
import { UtenteAnonimoService } from '../service/utente-anonimo.service';

@Component({
  selector: 'app-details-reservation',
  templateUrl: './details-reservation.component.html',
  styleUrls: ['./details-reservation.component.css']
})
export class DetailsReservationComponent implements OnInit {

  dettaglioPrenotazioni: DettaglioPrenotazione[] = []
  registerNoteForm: FormGroup = {} as FormGroup;

  dettTesserato: DettaglioPrenotazione = new DettaglioPrenotazione();
  constructor(private service: UtenteAnonimoService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.getDetailsReservation(id);

    }

    this.generateForm()
  }

  getDetailsReservation(id: any) {
    this.service.getDettagliPrenotazione(id).subscribe(
      data => {
        this.dettaglioPrenotazioni = data;
      
      }
    )
  }

  updateStatusReservation(data: DettaglioPrenotazione): Observable<any> {
    return this.service.modificaDettaglioPrenotazione(data);
  }

  effettuaPagamento(dettaglioPrenotazioni: any) {

    this.updateStatusReservation({
      'idDettaglio': dettaglioPrenotazioni["idDettaglio"],
      'codicePrenotazione': dettaglioPrenotazioni["codicePrenotazione"],
      'cliente': dettaglioPrenotazioni["cliente"],
      'pagamento': dettaglioPrenotazioni["pagamento"],
      'pagamentoEffettuato': dettaglioPrenotazioni.pagamentoEffettuato = true,
      'note': dettaglioPrenotazioni['note']
    }).subscribe({
      next: () => {

      },
      error: (error) => {
      }
    });

  }


  modificaPagamento(dettaglioPrenotazioni: any) {

    this.updateStatusReservation({
      'idDettaglio': dettaglioPrenotazioni["idDettaglio"],
      'codicePrenotazione': dettaglioPrenotazioni["codicePrenotazione"],
      'cliente': dettaglioPrenotazioni["cliente"],
      'pagamento': dettaglioPrenotazioni["pagamento"],
      'pagamentoEffettuato': dettaglioPrenotazioni.pagamentoEffettuato = false,
      'note': dettaglioPrenotazioni['note']
    }).subscribe({
      next: () => {

      },
      error: (error) => {
      }
    });

  }
  generateForm() {
    this.registerNoteForm = new FormGroup({
      note: new FormControl(this.dettTesserato.note ? this.dettTesserato.note : "", [Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(10), Validators.maxLength(80)]),
    });
  }


  get f() { return this.registerNoteForm.controls };

  selectId(id: any) {
  this.dettTesserato = id;
   this.generateForm()
  }

  inserisciNote() {
   this.dettTesserato.note = this.f['note'].value

    this.updateStatusReservation({

      'idDettaglio': this.dettTesserato["idDettaglio"],
      'codicePrenotazione': this.dettTesserato["codicePrenotazione"],
      'cliente': this.dettTesserato["cliente"],
      'pagamento': this.dettTesserato["pagamento"],
      'pagamentoEffettuato': this.dettTesserato['pagamentoEffettuato'],
      'note': this.dettTesserato.note 
    }).subscribe({
      next: () => {

      },
      error: (error) => {
      }
    });

  }
}



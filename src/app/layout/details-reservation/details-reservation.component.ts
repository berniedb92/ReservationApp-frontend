import { ModalConfirmComponent } from './../../components/modals/modal-confirm/modal-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DettaglioPrenotazione } from 'src/app/model/DettagliPrenotazione';
import { faHandHoldingDollar, faPiggyBank, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { UtenteAnonimoService } from 'src/service/utente-anonimo.service';

@Component({
  selector: 'app-details-reservation',
  templateUrl: './details-reservation.component.html',
  styleUrls: ['./details-reservation.component.css']
})
export class DetailsReservationComponent implements OnInit {

  dettaglioPrenotazioni: DettaglioPrenotazione[] = []
  registerNoteForm: FormGroup = {} as FormGroup;
  faPiggyBank = faPiggyBank
  faHandHoldingDollar = faHandHoldingDollar
  faNoteSticky = faNoteSticky

  dettTesserato: DettaglioPrenotazione = new DettaglioPrenotazione();
  constructor(private service: UtenteAnonimoService, private route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    const id = this.route.queryParams.subscribe(
      route => {
        if (route) {
          this.getDetailsReservation(route['id']);
        }
      }
    )

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


  annullaPagamento(dettaglioPrenotazioni: any) {

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

  openConfirm(action: string, dettaglio: any) {

    var message = ''

    switch(action) {
      case 'pagamento+':
        message = 'Sei sicuro di confermare il pagamento?'
        break
      case 'pagamento-':
        message = 'Sei sicuro di annullare il pagamento?'
    }

    const dialogRef = this.dialog.open(ModalConfirmComponent, {data: message})

    dialogRef.afterClosed().subscribe((res) => {
      console.log(res)
       if(action === 'pagamento+' && res === 'confirm') {
        this.effettuaPagamento(dettaglio)
       } else if(action === 'pagamento--' && res === 'confirm') {
        this.annullaPagamento(dettaglio)
       }
    });
  }
}



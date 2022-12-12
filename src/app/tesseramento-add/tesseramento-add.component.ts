import { ActivatedRoute } from '@angular/router';
import { GlobalFunctions } from './../common/global-functions';
import { Cliente } from './../model/cliente';
import { UtenteAnonimoService } from './../service/utente-anonimo.service';
import { Tesseramento, TipoTessera, IntegrazioneTessera } from './../model/tesseramento';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tesseramento-add',
  templateUrl: './tesseramento-add.component.html',
  styleUrls: ['./tesseramento-add.component.css']
})
export class TesseramentoAddComponent implements OnInit {

  title = ''
  tesseramento: Tesseramento = new Tesseramento()
  clientiNoTess: Cliente[]= []
  tesserati:Tesseramento[] = []
  tipiTessera: TipoTessera[] = []
  integrazioneTessera: IntegrazioneTessera[] = []
  tesseraForm: FormGroup = {} as FormGroup;

  constructor(private service: UtenteAnonimoService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    if(this.tesseramento.codiceTessera === 0) {
      this.title = "Inserisci nuovo tesserato";
      this.service.listaClientiNoTessera().subscribe({
        next: (response) => {
          this.clientiNoTess = response
        }
      })
    } else {
      const codice = this.route.snapshot.params['codice'];
      this.title = "Modifica tesserato";
      this.service.selTesseratoCodice(codice).subscribe({
        next: (response) => {
          this.tesseramento = response
        }
      })
    }

    this.service.integrazioneTessera().subscribe({
      next: (response) => {
        this.integrazioneTessera = response
      }
    })

    this.service.tipoTessera().subscribe({
      next: (response) => {
        this.tipiTessera = response
      }
    })

    this.generateForm()
  }

  get tesseramenti() {
    return this.tesseraForm.controls
  }

  onSubmit() {

    this.tesseramento.clienteTess = this.tesseramenti['cliente'].value
    this.tesseramento.tipo = this.tesseramenti['tipo'].value
    this.tesseramento.integrazione = this.tesseramenti['integrazione'].value
    this.tesseramento.scadenzaCertificato = this.tesseramenti['scadenzaCertificato'].value

    const cliente = this.clientiNoTess.filter(x => x.id == this.tesseramenti['cliente'].value)
    const tipo = this.tipiTessera.filter(x => x.id == this.tesseramenti['tipo'].value)
    const integrazione = this.integrazioneTessera.filter(x => x.id == this.tesseramenti['integrazione'].value)

    this.tesseramento.clienteTess = cliente[0];
    this.tesseramento.tipo = tipo[0];
    this.tesseramento.integrazione = integrazione[0];

    if(this.tesseramento.codiceTessera === 0) {
      this.service.insTesserato(this.tesseramento).subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error) => {
          console.log(error.error.message)
        }
      })
    } else {
      this.service.upTesserato(this.tesseramento).subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error) => {
          console.log(error.error.message)
        }
      })
    }

  }

  generateForm()  {
    this.tesseraForm = new FormGroup({
      cliente: new FormControl(this.tesseramento.clienteTess, [Validators.required]),
      tipo: new FormControl(this.tesseramento.tipo, [Validators.required]),
      integrazione: new FormControl(this.tesseramento.integrazione, [Validators.required]),
      scadenzaCertificato: new FormControl(this.tesseramento.scadenzaCertificato, [Validators.required, GlobalFunctions.validateDate()])
    })
  }

}

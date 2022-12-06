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
  tipiTessera: TipoTessera[] = []
  integrazioneTessera: IntegrazioneTessera[] = []
  tesseraForm: FormGroup = {} as FormGroup;

  constructor(private service: UtenteAnonimoService) { }

  ngOnInit(): void {
    this.service.listaClientiNoTessera().subscribe({
      next: (response) => {
        this.clientiNoTess = response
      }
    })

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

  onSubmit() {

  }

  generateForm()  {
    this.tesseraForm = new FormGroup({
      cliente: new FormControl(this.tesseramento.clienteTess ? this.tesseramento.clienteTess : "", [Validators.required]),
      tipo: new FormControl(this.tesseramento.tipoTessera ? this.tesseramento.tipoTessera : "", [Validators.required]),
      integrazione: new FormControl(this.tesseramento.integrazioneTessera ? this.tesseramento.integrazioneTessera : "", [Validators.required]),
      scadenzaCertificato: new FormControl(this.tesseramento.scadenzaCertificato ? this.tesseramento.scadenzaCertificato : "", [Validators.required, GlobalFunctions.validateDate()])
    })
  }

}

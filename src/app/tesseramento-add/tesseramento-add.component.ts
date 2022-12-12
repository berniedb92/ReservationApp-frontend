import { ActivatedRoute } from '@angular/router';
import { GlobalFunctions } from './../common/global-functions';
import { Cliente } from './../model/cliente';
import { UtenteAnonimoService } from './../service/utente-anonimo.service';
import { Tesseramento, TipoTessera, IntegrazioneTessera } from './../model/tesseramento';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tesseramento-add',
  templateUrl: './tesseramento-add.component.html',
  styleUrls: ['./tesseramento-add.component.css']
})
export class TesseramentoAddComponent implements OnInit {

  title = ''
  tesseramento: Tesseramento = new Tesseramento()
  clientiNoTess: Cliente[]= []
  cliente: Cliente = new Cliente()
  codiceModifica: number = 0;
  tesserati:Tesseramento[] = []
  tipiTessera: TipoTessera[] = []
  integrazioneTessera: IntegrazioneTessera[] = []
  tesseraForm: FormGroup = {} as FormGroup;

  constructor(private service: UtenteAnonimoService, public route: ActivatedRoute) { }

  ngOnInit(): void {

   this.generateForm()

    this.service.tipoTessera().subscribe({
      next: (response) => {
        this.tipiTessera = response
      }
    })

    this.service.integrazioneTessera().subscribe({
      next: (response) => {
        this.integrazioneTessera = response
      }
    })

    const codice = this.route.snapshot.params['codice'];

    if(!codice) {
      this.title = "Inserisci nuovo tesserato";

      this.service.listaClientiNoTessera().subscribe({
        next: (response) => {
          this.clientiNoTess = response
        }
      })

    } else {
      this.title = "Modifica tesserato";
      this.service.selTesseratoCodice(codice).subscribe({
        next: (response) => {
          console.log(response)
          this.tesseramenti['cliente'].disable()
          const tipo = this.tipiTessera.filter(x => x.id == response.tipo.id)
          const integrazione = this.integrazioneTessera.filter(x => x.id == response.integrazione.id)
          this.cliente = response.clienteTess;
          this.codiceModifica = codice;

          this.tesseramenti['cliente'].patchValue(this.cliente.cognome + ' ' + this.cliente.nome)
          this.tesseramenti['tipo'].patchValue(tipo[0].id)
          this.tesseramenti['integrazione'].patchValue(integrazione[0].id)
          this.tesseramenti['scadenzaCertificato'].patchValue(response.scadenzaCertificato)
          this.tesseramenti['dataTesseramento'].patchValue(response.dataTesseramento)


          this.tesseramento.codiceTessera = codice;


          // this.tesseramento = response;


          // this.tesseramento.tipo = this.tesseramenti['tipo'].value
          // this.tesseramento.integrazione = this.tesseramenti['integrazione'].value
          // this.tesseramento.scadenzaCertificato = this.tesseramenti['scadenzaCertificato'].value

          // this.tesseramento.tipo = tipo[0];
          // this.tesseramento.integrazione = integrazione[0];

          // this.service.listaClientiId(response.clienteTess.id).subscribe({
          //   next:(resp) => {
          //     this.clientiTess[0] = resp;
          //    this.tesseramenti['cliente'].patchValue(this.clientiTess[0].id)
          //     this.generateForm()
          //   }
          // })
          // this.generateForm()

        }
      })
    }

  }

  get tesseramenti() {
    return this.tesseraForm.controls
  }

  onSubmit() {

    this.tesseramento.clienteTess = this.tesseramenti['cliente'].value
    this.tesseramento.tipo = this.tesseramenti['tipo'].value
    this.tesseramento.integrazione = this.tesseramenti['integrazione'].value
    this.tesseramento.scadenzaCertificato = this.tesseramenti['scadenzaCertificato'].value


    const tipo = this.tipiTessera.filter(x => x.id == this.tesseramenti['tipo'].value)
    const integrazione = this.integrazioneTessera.filter(x => x.id == this.tesseramenti['integrazione'].value)


    this.tesseramento.tipo = tipo[0];
    this.tesseramento.integrazione = integrazione[0];

    console.log(this.tesseramento)

    if(this.codiceModifica === 0) {
      const cliente = this.clientiNoTess.filter(x => x.id == this.tesseramenti['cliente'].value)
      this.tesseramento.clienteTess = cliente[0];
      this.service.insTesserato(this.tesseramento).subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error) => {
          console.log(error.error.message)
        }
      })
    } else {
      //this.tesseramenti['cliente'].enable()
      this.tesseramento.clienteTess = this.cliente
      console.log(this.tesseramento, 'modifica')
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
      cliente: new FormControl(this.tesseramento.clienteTess ? this.tesseramento.clienteTess : '', [Validators.required]),
      tipo: new FormControl(this.tesseramento.tipo ? this.tesseramento.tipo : '', [Validators.required]),
      integrazione: new FormControl(this.tesseramento.integrazione ? this.tesseramento.integrazione: '', [Validators.required]),
      scadenzaCertificato: new FormControl(this.tesseramento.scadenzaCertificato ? this.tesseramento.scadenzaCertificato: '', [Validators.required, GlobalFunctions.validateDate()]),
      dataTesseramento: new FormControl(this.tesseramento.dataTesseramento ? this.tesseramento.dataTesseramento: '', [GlobalFunctions.validateDate()])
    })
  }

  // generateForm()  {
  //   this.tesseraForm = new FormGroup({
  //     cliente: new FormControl(this.tesseramento.clienteTess, [Validators.required]),
  //     tipo: new FormControl(this.tesseramento.tipo, [Validators.required]),
  //     integrazione: new FormControl(this.tesseramento.integrazione, [Validators.required]),
  //     scadenzaCertificato: new FormControl(this.tesseramento.scadenzaCertificato, [Validators.required, GlobalFunctions.validateDate()])
  //   })
  // }

  }



import { UtenteAnonimoService } from './../service/utente-anonimo.service';
import { Tesseramento } from './../model/tesseramento';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tesseramento-list',
  templateUrl: './tesseramento-list.component.html',
  styleUrls: ['./tesseramento-list.component.css']
})
export class TesseramentoListComponent implements OnInit {

  tesserati: Tesseramento[] = []
  pageIndex: number = 1
  pageSize: number = 20
  quoteSel = {
    doppio: 0,
    singolo: 0,
    padel:0,
    tesserato: ""
  }

  constructor(private service: UtenteAnonimoService, private router: Router) {
    this.router.events.subscribe((res) => {
      console.log(this.router.url,"Current URL");
  })
  }

  ngOnInit(): void {


    this.service.selTesserati().subscribe({
      next: (response) => {
        this.tesserati = response;
      }
    })
  }

  deleteTessera(codice: number) {
    this.service.delTesserato(codice).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (error) => {
        console.log(error.error.message)
      }
    })
  }

  quote(codice: number, tessera: any) {
    this.service.selQuoteTesserato(codice).subscribe({
      next: (response) => {
        this.quoteSel = {
          doppio: response.DoppioTennis,
          singolo: response.SingoloTennis,
          padel: response.Padel,
          tesserato: tessera
        }
      },
      error: (error) => {

      }
    })
  }

}

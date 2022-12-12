import { UtenteAnonimoService } from './../service/utente-anonimo.service';
import { Tesseramento } from './../model/tesseramento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tesseramento-list',
  templateUrl: './tesseramento-list.component.html',
  styleUrls: ['./tesseramento-list.component.css']
})
export class TesseramentoListComponent implements OnInit {

  tesserati: Tesseramento[] = []
  pageIndex: number = 1
  pageSize: number = 20

  constructor(private service: UtenteAnonimoService) { }

  ngOnInit(): void {

    this.service.selTesserati().subscribe({
      next: (response) => {
        this.tesserati = response;
      }
    })
  }

}

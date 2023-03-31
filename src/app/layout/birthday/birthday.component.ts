import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/Cliente';
import { UtenteAnonimoService } from 'src/service/utente-anonimo.service';

@Component({
  selector: 'app-birthday',
  templateUrl: './birthday.component.html',
  styleUrls: ['./birthday.component.css']
})
export class BirthdayComponent implements OnInit {

  clientiComplex: Cliente[];
  clienti!: Cliente[];
  errore: string = ''

  constructor(private utenteAnonimoService: UtenteAnonimoService) {
    this.clientiComplex = []
   }

  ngOnInit(): void {

    this.utenteAnonimoService.listaClientiDataNascita().subscribe({
      next:(data) => {
        this.clientiComplex = data;
      },
      error: (error) => {
        this.errore = error.error.message;
      }
    }
    )

  }

  // birthday(clientiPass: Cliente[]): Cliente[] {

  //   const clientiRest : Cliente[] = []
  //   const dateNow : Date = new Date;
  //   const ggB = dateNow.getDay();
  //   const mmB = dateNow.getMonth() + 1;

  //   for(let i = 0; i < clientiPass.length; i++) {

  //     const ggA = clientiPass[i].dataNascita.getDay();
  //     const mmA = clientiPass[i].dataNascita.getMonth() + 1;

  //     if((ggA === ggB) && (mmA === mmB)) {
  //       clientiRest.push(clientiPass[i])
  //     }

  //   }

  //   return clientiRest;

  // }

}

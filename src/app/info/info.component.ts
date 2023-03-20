import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { UtenteAnonimoService } from 'src/app/service/utente-anonimo.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  cliente: Cliente;

  constructor(private utenteAnonimoService: UtenteAnonimoService,private route: ActivatedRoute) {
    this.cliente = new Cliente()
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const id = Number(param.get('id'));
      this.utenteAnonimoService.listaClientiId(id).subscribe(
        cliente => {
         this.cliente= cliente;
        }
      )

    })
  }

}

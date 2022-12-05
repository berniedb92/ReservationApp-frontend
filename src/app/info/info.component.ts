import { Cliente } from './../model/cliente';
import { Component, Input, OnInit } from '@angular/core';
import { UtenteAnonimoService } from '../service/utente-anonimo.service';
import { ActivatedRoute } from '@angular/router';

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

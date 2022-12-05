import { MatSnackBar } from '@angular/material/snack-bar';
import { UtenteAnonimoService } from '../service/utente-anonimo.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-clienti-add',
  templateUrl: './clienti-add.component.html',
  styleUrls: ['./clienti-add.component.css']
})
export class ClientiAddComponent implements OnInit {

  //cliente!: Cliente;
  _cliente!: Cliente;
  clienteCopy!: Cliente;
  carica!: boolean;

  set cliente(cliente: Cliente) {
    this._cliente = cliente;
    this.clienteCopy = Object.assign({}, cliente);
  }
  get cliente() {
    return this._cliente;
  }

  constructor(private utenteAnonimoService: UtenteAnonimoService,
    private router: ActivatedRoute, private route: Router, private snackbar: MatSnackBar) {
      this._cliente = new Cliente();
      this.clienteCopy = new Cliente();
    }


  ngOnInit(): void {
    this.router.paramMap.subscribe(param => {
      const id = Number(param.get('id'));
      if (id) {
        this.utenteAnonimoService.listaClientiId(id).subscribe(
          cliente => {
            this.cliente = cliente;
          }
        )
      }
    })
  }

  onSubmit(): void {

    if (this.cliente.id > 0) {
      const userCopy = Object.assign({}, this.cliente)
      this.utenteAnonimoService.uodateCliente(userCopy).subscribe({
          next:(result) => {
              this.goToListClienti();
              this.openSnackBar(result.message, 'OK')
            },
          error:(error) => {
              this.goToAddClienti();
              this.openSnackBar(error.error.message, 'X')
            }
        })
    } else {
      this.utenteAnonimoService.addCliente(this.cliente).subscribe({
        next:(result) => {
            this.goToListClienti();
            this.openSnackBar(result.message, 'OK')
          },
        error:(error) => {
            this.goToAddClienti();
            this.openSnackBar(error.error.message, 'X')
          }
      })
    }

    console.log(this.cliente)
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 3500,
    });
  }

  resetForm(form: any) {
    if (this.cliente.id === 0) {
      this.cliente = new Cliente();
    } else {
      this.cliente = this.clienteCopy;
    }

  }

  goToListClienti() {
    this.route.navigate(['cliente-list']);
  }

  goToAddClienti() {
    this.route.navigate(['cliente-add']);
  }


}



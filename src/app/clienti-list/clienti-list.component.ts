import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Cliente } from "src/app/model/cliente";
import { UtenteAnonimoService } from "src/app/service/utente-anonimo.service";

@Component({
  selector: 'app-clienti-list',
  templateUrl: './clienti-list.component.html',
  styleUrls: ['./clienti-list.component.css']
})
export class ClientiListComponent implements OnInit {

  clienti: Cliente[];
  clientiSort: Cliente[];

  pageIndex: number = 1
  pageSize: number = 5

  date: Date = new Date()

  @Output() openSnack = new EventEmitter<any>();

  constructor(private utenteAnonimoService: UtenteAnonimoService,
     private snackbar: MatSnackBar) {

      this.clienti = [];
      this.clientiSort = []

  }

  ngOnInit(): void {

    this.utenteAnonimoService.listaClienti().subscribe(
      data => {
        this.clienti = data;
        this.clienti = this.clienti.sort((a,b) => this.sortByCognome(a,b));
        this.clientiSort = this.clienti;

      }

    )

  }

  filterClienteByCognome(cognome: string) {
    if(cognome === '') {
      this.clientiSort = this.clienti;
    } else {
      this.clientiSort = this.clienti.filter(x => x.cognome.toLowerCase().includes(cognome.toLowerCase()));
    }
  }

  sortChange(sort: number) {
    if(sort === 1) {
      this.clientiSort = this.clientiSort.sort((a,b) => this.sortByCognome(a,b));
    } else if (sort === 2) {
      this.clientiSort = this.clientiSort.sort((a,b) => this.sortByDataNascita(a,b));
    }
  }

  sortByDataNascita(a: Cliente, b: Cliente){

    if(a.dataNascita < b.dataNascita) {
      return -1;
    } else if(a.dataNascita > b.dataNascita) {
      return 1;
    }
    return 0;
  }

  sortByCognome(a: Cliente, b: Cliente){

    if(a.cognome < b.cognome) {
      return -1;
    } else if(a.cognome > b.cognome) {
      return 1;
    }
    return 0;
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
       duration: 3500,
    });
  }

  deleteCliente(id: number) {
    this.utenteAnonimoService.deleteCliente(id).subscribe({
      next:(result) => {
        let name : any = this.clienti.find(x=>x.id == id)?.nome;
        this.clienti.splice(this.clienti.findIndex(x=>x.id==id),1)
        this.clientiSort = this.clienti;
        this.openToast(result.message)
       // this.openSnackBar(result.message, name)
      },
      error: (error) => {
        this.openSnackBar(error.error.message, 'X')
      }
    }
    )
  }

  filterByscadenzaCertificato() {
    // this.clientiSort = this.clienti.filter(x => x.isScad);

  }

  openToast(message: any) {
    this.openSnack.emit(message)
  }

}

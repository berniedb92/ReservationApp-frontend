import { UtenteAnonimoService } from '../service/utente-anonimo.service';
import { Component, OnInit } from '@angular/core';
import { Campo } from '../model/campo';

@Component({
  selector: 'app-campi-list',
  templateUrl: './campi-list.component.html',
  styleUrls: ['./campi-list.component.css']
})
export class CampiListComponent implements OnInit {

  campi: Campo[]
  campiCopy!:Campo[]
  showAdd: boolean = false;

  constructor(private utenteAnonimoService:UtenteAnonimoService) {
    this.campi = [];
  }

  ngOnInit(): void {
    this.utenteAnonimoService.listaCampi().subscribe(
      data => {
        this.campiCopy = data;
        this.campi = this.campiCopy;
      }
    )
  }

  showsAdd() {
    this.showAdd = true;
  }

  hideAdd() {
    this.showAdd = false;
  }

  deleteCampo(numero: number) {
    this.utenteAnonimoService.deleteCampo(numero).subscribe(
      // (booleanResult:BooleanResult) => {
      //   if(booleanResult.esito === true) {
      //     this.campiCopy.splice(this.campiCopy.findIndex(x=>x.numero == numero), 1)
      //     this.campiCopy = this.campi;
      //   }
      // }
    )
  }

  reloadComponent(){
    this.ngOnInit();
  }

}

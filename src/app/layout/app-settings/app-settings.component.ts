import { ModalSetAvailabilityComponent } from './../modal-set-availability/modal-set-availability.component';
import { MatDialog } from '@angular/material/dialog';
import { faTrash, faCalendarPlus, faAdd } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from "@angular/core";
import { Campo } from "src/app/model/campo";
import { UtenteAnonimoService } from "src/service/utente-anonimo.service";
import { ModalAddCampoComponent } from '../modal-add-campi/modal-add-campi.component';


@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.css']
})
export class AppSettingsComponent implements OnInit {

  campi: Campo[]
  campiCopy!:Campo[]
  showAdd: boolean = false;
  faTrash = faTrash
  faCalendarPlus = faCalendarPlus
  faAdd = faAdd

  constructor(private utenteAnonimoService:UtenteAnonimoService, private dialog: MatDialog) {
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

 openSettingsAvailability(id: number) {
  this.dialog.open(ModalSetAvailabilityComponent, {data: id})
 }

 openAddCampo() {
  this.dialog.open(ModalAddCampoComponent)
 }

}

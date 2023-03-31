import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UtenteAnonimoService } from 'src/service/utente-anonimo.service';
import { Campo } from 'src/app/model/campo';

@Component({
  selector: 'app-modal-add-campi',
  templateUrl: './modal-add-campi.component.html',
  styleUrls: ['./modal-add-campi.component.css']
})
export class ModalAddCampoComponent {

  campo: Campo;
  @Output('close-add-campi') closeAdd = new EventEmitter();
  @Output('reload') reload = new EventEmitter();

  constructor(private utenteAnonimoService: UtenteAnonimoService, private route : Router) {
    this.campo = new Campo()
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.utenteAnonimoService.addCampo(this.campo).subscribe(
    //   (booleanResult:BooleanResult) => {
    //     if(booleanResult.esito === true) {
    //       this.close();
    //       this.reloadC();
    //   }
    // }
    )
  }

  close() {
    this.closeAdd.emit();
  }

  reloadC(){
    this.reload.emit();
  }

}

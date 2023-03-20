import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Campo } from 'src/app/model/campo';
import { UtenteAnonimoService } from 'src/app/service/utente-anonimo.service';

@Component({
  selector: 'app-campi-add',
  templateUrl: './campi-add.component.html',
  styleUrls: ['./campi-add.component.css']
})
export class CampiAddComponent {

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

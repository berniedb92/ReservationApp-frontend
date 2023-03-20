import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { CampiAddComponent } from "./campi-add/campi-add.component";
import { CampiListComponent } from "./campi-list/campi-list.component";
import { ClientiAddComponent } from "./clienti-add/clienti-add.component";
import { ClientiListComponent } from "./clienti-list/clienti-list.component";
import { DetailsReservationComponent } from "./details-reservation/details-reservation.component";
import { Error404Component } from "./errors/error404.component";
import { HomeComponent } from "./home/home.component";
import { InfoComponent } from "./info/info.component";
import { LoginComponent } from "./login/login.component";
import { ReservationAddComponent } from "./reservation-add/reservation-add.component";
import { ReservationComponent } from "./reservation/reservation.component";
import { TesseramentoAddComponent } from "./tesseramento-add/tesseramento-add.component";
import { TesseramentoListComponent } from "./tesseramento-list/tesseramento-list.component";

const routes: Routes = [
  { path: 'cliente-list', component: ClientiListComponent },
  { path: 'cliente-add', component:ClientiAddComponent },
  { path: '', component:HomeComponent },
  { path: 'cliente-info/:id', component:InfoComponent },
  { path: 'cliente-info/:id/modifica', component:ClientiAddComponent },
  { path: 'campi-list', component:CampiListComponent },
  { path: 'campi-add', component:CampiAddComponent },
  { path: 'reservation/:numero', component: ReservationComponent },
  { path: 'reservation', component: ReservationAddComponent },
  { path: 'new-tess', component: TesseramentoAddComponent },
  { path: 'tesseramenti', component: TesseramentoListComponent },
  { path: 'insert-reservation',component:ReservationAddComponent},
  { path: 'details-reservation/:id',component:DetailsReservationComponent},
  { path: 'modifica-tessera/:codice',component:TesseramentoAddComponent},
  { path: 'login',component:LoginComponent},
  { path: '**', component:Error404Component}
];


@NgModule({
  declarations: [
   ],
  imports: [RouterModule.forRoot(routes),
    FormsModule,
    CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

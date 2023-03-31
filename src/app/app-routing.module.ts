import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { RouteGuardService } from "src/service/route-guard.service";
import { Error404Component } from "./components/errors/error404.component";
import { ClientiAddComponent } from "./layout/clienti-add/clienti-add.component";
import { ClientiListComponent } from "./layout/clienti-list/clienti-list.component";
import { DetailsReservationComponent } from "./layout/details-reservation/details-reservation.component";
import { LoginComponent } from "./layout/login/login.component";
import { ReservationAddComponent } from "./layout/reservation-add/reservation-add.component";
import { ReservationComponent } from "./layout/reservation/reservation.component";
import { TesseramentoAddComponent } from "./layout/tesseramento-add/tesseramento-add.component";
import { TesseramentoListComponent } from "./layout/tesseramento-list/tesseramento-list.component";
import { Ruoli } from "./model/Ruoli";
import { HomeComponent } from "./layout/home.component";
import { AppSettingsComponent } from "./layout/app-settings/app-settings.component";

const routes: Routes = [
  { path: '', component:HomeComponent, canActivate: [RouteGuardService], data: { roles:[Ruoli.amministratore]} },
  { path: 'cliente-list', component: ClientiListComponent, canActivate: [RouteGuardService], data: { roles:[Ruoli.amministratore]} },
  { path: 'cliente-add', component:ClientiAddComponent,canActivate: [RouteGuardService], data: { roles:[Ruoli.amministratore]} },
  { path: 'cliente-info/:id/modifica', component:ClientiAddComponent,canActivate: [RouteGuardService], data: { roles:[Ruoli.amministratore]} },
  { path: 'campi-list', component:AppSettingsComponent, canActivate: [RouteGuardService], data: { roles:[Ruoli.amministratore]} },
  { path: 'reservation/:numero', component: ReservationComponent, canActivate: [RouteGuardService], data: { roles:[Ruoli.utente, Ruoli.amministratore]} },
  { path: 'reservation', component: ReservationAddComponent,canActivate: [RouteGuardService], data: { roles:[Ruoli.utente, Ruoli.amministratore]} },
  { path: 'new-tess', component: TesseramentoAddComponent, canActivate: [RouteGuardService], data: { roles:[Ruoli.amministratore]} },
  { path: 'tesseramenti', component: TesseramentoListComponent,canActivate: [RouteGuardService], data: { roles:[Ruoli.amministratore]} },
  { path: 'insert-reservation',component:ReservationAddComponent, canActivate: [RouteGuardService], data: { roles:[Ruoli.utente, Ruoli.amministratore]}},
  { path: 'details-reservation',component:DetailsReservationComponent, canActivate: [RouteGuardService], data: { roles:[Ruoli.amministratore]}},
  { path: 'modifica-tessera/:codice',component:TesseramentoAddComponent, canActivate: [RouteGuardService], data: { roles:[Ruoli.amministratore]}},
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

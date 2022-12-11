import { TesseramentoAddComponent } from './tesseramento-add/tesseramento-add.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ClientiAddComponent } from './clienti-add/clienti-add.component';
import { ClientiListComponent } from './clienti-list/clienti-list.component';
import { InfoComponent } from './info/info.component';
import { CampiListComponent } from './campi-list/campi-list.component';
import { CampiAddComponent } from './campi-add/campi-add.component';

import { ReservationComponent } from './reservation/reservation.component';
import { ReservationAddComponent } from './reservation-add/reservation-add.component';

const routes: Routes = [
  { path: 'cliente-list', component: ClientiListComponent },
  { path: 'cliente-add', component:ClientiAddComponent },
  { path: '', component:HomeComponent },
  { path: 'cliente-info/:id', component:InfoComponent },
  { path: 'cliente-info/:id/modifica', component:ClientiAddComponent },
  { path: 'campi-list', component:CampiListComponent },
  { path: 'campi-add', component:CampiAddComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'tesseramenti', component: TesseramentoAddComponent },
   {path:"insert-reservation",component:ReservationAddComponent}

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

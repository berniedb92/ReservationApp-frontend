import { MaterialModule } from './material/material.module';
import { UtenteAnonimoService } from './service/utente-anonimo.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BirthdayComponent } from './birthday/birthday.component';
import { CampiAddComponent } from './campi-add/campi-add.component';
import { CampiListComponent } from './campi-list/campi-list.component';
import { ClientiAddComponent } from './clienti-add/clienti-add.component';
import { ClientiListComponent } from './clienti-list/clienti-list.component';
import { InfoComponent } from './info/info.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ToastsComponent } from './toasts/toasts.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationAddComponent } from './reservation-add/reservation-add.component';
import { ReservationDayComponent } from './reservation-day/reservation-day.component';
import { TesseramentoAddComponent } from './tesseramento-add/tesseramento-add.component';
import { DetailsReservationComponent } from './details-reservation/details-reservation.component';
import { TesseramentoListComponent } from './tesseramento-list/tesseramento-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ActivatedRouteSnapshot } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BirthdayComponent,
    ClientiListComponent,
    ClientiAddComponent,
    InfoComponent,
    CampiListComponent,
    CampiAddComponent,
    FooterComponent,
    HomeComponent,
    ToastsComponent,
    ReservationComponent,
    ReservationAddComponent,
    ReservationDayComponent,
    TesseramentoAddComponent,
    TesseramentoListComponent,
    DetailsReservationComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,

  ],
  providers: [UtenteAnonimoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

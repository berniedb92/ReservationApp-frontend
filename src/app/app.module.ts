import { MaterialModule } from './material/material.module';
import { UtenteAnonimoService } from './service/utente-anonimo.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {CalendarModule} from 'primeng/calendar';
import { RippleModule } from 'primeng/ripple';
import { CampiListComponent } from './campi-list/campi-list.component';
import { BirthdayComponent } from './birthday/birthday.component';
import { CampiAddComponent } from './campi-add/campi-add.component';
import { ClientiAddComponent } from './clienti-add/clienti-add.component';
import { ClientiListComponent } from './clienti-list/clienti-list.component';
import { DetailsReservationComponent } from './details-reservation/details-reservation.component';
import { Error404Component } from './errors/error404.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReservationAddComponent } from './reservation-add/reservation-add.component';
import { ReservationDayComponent } from './reservation-day/reservation-day.component';
import { ReservationComponent } from './reservation/reservation.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TesseramentoAddComponent } from './tesseramento-add/tesseramento-add.component';
import { TesseramentoListComponent } from './tesseramento-list/tesseramento-list.component';
import { ToastsComponent } from './toasts/toasts.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientiListComponent,
    ClientiAddComponent,
    CampiListComponent,
    CampiAddComponent,
    ReservationComponent,
    ReservationAddComponent,
    ReservationDayComponent,
    TesseramentoAddComponent,
    TesseramentoListComponent,
    DetailsReservationComponent,
    NavbarComponent,
    BirthdayComponent,
    InfoComponent,
    FooterComponent,
    HomeComponent,
    ToastsComponent,
    SidebarComponent,
    Error404Component,
    LoginComponent,
    JumbotronComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    CalendarModule,
    RippleModule
  ],
  providers: [UtenteAnonimoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

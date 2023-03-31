import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {CalendarModule} from 'primeng/calendar';
import { RippleModule } from 'primeng/ripple';
import { IonicModule } from '@ionic/angular';
import { AuthInterceptorService } from 'src/service/interceptors/auth-interceptor.service';
import { GestErrorInterceptor } from 'src/service/interceptors/gest-error.interceptor';
import { NetworkInterceptor } from 'src/service/interceptors/network.interceptor';
import { UtenteAnonimoService } from 'src/service/utente-anonimo.service';
import { MaterialModule } from './material/material.module';
import { Error404Component } from './components/errors/error404.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalErrorComponent } from './components/modals/modal-error/modal-error.component';
import { ModalSuccessComponent } from './components/modals/modal-success/modal-success.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { BirthdayComponent } from './layout/birthday/birthday.component';
import { ModalAddCampoComponent } from './layout/modal-add-campi/modal-add-campi.component';
import { AppSettingsComponent } from './layout/app-settings/app-settings.component';
import { ClientiAddComponent } from './layout/clienti-add/clienti-add.component';
import { ClientiListComponent } from './layout/clienti-list/clienti-list.component';
import { DetailsReservationComponent } from './layout/details-reservation/details-reservation.component';
import { HomeComponent } from './layout/home.component';
import { LoginComponent } from './layout/login/login.component';
import { ReservationAddComponent } from './layout/reservation-add/reservation-add.component';
import { ReservationDayComponent } from './layout/reservation-day/reservation-day.component';
import { ReservationComponent } from './layout/reservation/reservation.component';
import { TesseramentoAddComponent } from './layout/tesseramento-add/tesseramento-add.component';
import { TesseramentoListComponent } from './layout/tesseramento-list/tesseramento-list.component';
import { ModalSetAvailabilityComponent } from './layout/modal-set-availability/modal-set-availability.component';
import { ModalConfirmComponent } from './components/modals/modal-confirm/modal-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientiListComponent,
    ClientiAddComponent,
    AppSettingsComponent,
    ModalAddCampoComponent,
    ReservationComponent,
    ReservationAddComponent,
    ReservationDayComponent,
    TesseramentoAddComponent,
    TesseramentoListComponent,
    DetailsReservationComponent,
    NavbarComponent,
    BirthdayComponent,
    FooterComponent,
    HomeComponent,
    SidebarComponent,
    Error404Component,
    LoginComponent,
    SpinnerComponent,
    ModalErrorComponent,
    ModalSuccessComponent,
    ModalSetAvailabilityComponent,
    ModalConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    CalendarModule,
    RippleModule,
    IonicModule.forRoot()
  ],
  providers: [UtenteAnonimoService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: GestErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true},
    ],
  bootstrap: [AppComponent],
})
export class AppModule { }

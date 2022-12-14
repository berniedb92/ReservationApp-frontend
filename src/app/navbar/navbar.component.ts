import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { RouteguardGuard } from '../routeguard.guard';
import { UtenteAnonimoService } from '../service/utente-anonimo.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AdminMenu, UserMenu } from '../sidebar/navbar.enum';
interface ItemAdminMenu {
  description: string;
  itemMenu: AdminMenu | UserMenu;
  icon: string;
  paths: string[];
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit , AfterViewInit{

  route:string ="";
 
  constructor(private service:UtenteAnonimoService,) {

   }



  ngOnInit(): void {


  }

  ngAfterViewInit(): void {

  }




}

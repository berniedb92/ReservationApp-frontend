import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteguardGuard } from '../routeguard.guard';
import { UtenteAnonimoService } from '../service/utente-anonimo.service';
import { AdminMenu, UserMenu } from './navbar.enum';
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
export class NavbarComponent implements OnInit {
  topbarAdminList: Array<ItemAdminMenu> = [];
  sidebarOpen: boolean = false;
  sidebarWidth: string = "3.5rem";
  route:string ="";
  constructor(private service:UtenteAnonimoService,) {
   }


  ngOnInit(): void {
console.log("this.rote",this.route)
   
  }
  openCloseSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    if (this.sidebarOpen) {
      this.sidebarWidth = "15rem";
    } else {
      this.sidebarWidth = "3.5rem";
    }
}
}

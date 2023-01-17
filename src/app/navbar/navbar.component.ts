import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { faBuildingCircleXmark, faCalendarPlus, faMagnifyingGlass, faPlus, faUserPen, faUserPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { UtenteAnonimoService } from '../service/utente-anonimo.service';

import { AdminNavbarMenu, UserNavbarMenu } from './navbar.enum';

interface ItemMenu {
  description: string;
  itemMenu: AdminNavbarMenu | UserNavbarMenu;
  icon: IconDefinition;
  paths: string[];
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  route: any;
  topbarUserList: Array<ItemMenu> = [];
  userEnum = UserNavbarMenu;
  userMenu: UserNavbarMenu | undefined;

  constructor(private service: UtenteAnonimoService, private router: Router) {

    this.router.events.subscribe((res) => {
      console.log("Rotta", this.router.url);
      this.generateButtonNavbar(this.router.url)

    })

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  generateButtonNavbar(value: string) {
    this.topbarUserList = [];

    switch (value) {
      case "/cliente-list": {
        this.topbarUserList = [
          {
            description: 'Aggiungi Cliente',
            itemMenu: UserNavbarMenu.addClient,
            icon: faUserPlus,
            paths: ["/cliente-add"],
          }
        ]
      }
        break;
      case "/campi-list": {
        this.topbarUserList = [
          {
            description: "Aggiungi Campo",
            itemMenu: UserNavbarMenu.addCampi,
            icon: faPlus,
            paths: ["/campi-add"],

          }
        ]
      }
        break;
      case "/reservation": {
        [
          this.topbarUserList = [
            // {
            //   description: "Aggiungi Prenotazione",
            //   itemMenu: UserNavbarMenu.addReservation,
            //   icon: faCalendarPlus,
            //   paths: [''],

            // },
            {
              description: "Campo 1",
              itemMenu: UserNavbarMenu.campo1,
              icon: faMagnifyingGlass,
              paths: [""],
            },
            {
              description: "Campo 2",
              itemMenu: UserNavbarMenu.campo2,
              icon: faMagnifyingGlass,
              paths: [""],
            },
            {
              description: "Campo Padel",
              itemMenu: UserNavbarMenu.campo3,
              icon: faMagnifyingGlass,
              paths: ["/campi-add"],
            }
          ]
        ]

      }
        break;
      case "/tesseramenti": {

        this.topbarUserList = [
          {
            description: 'Aggiungi Tesserato',
            itemMenu: UserNavbarMenu.addTesserato,
            icon: faUserPen,
            paths: ["/new-tess"],
          }
        ]

        break;
      }
    }

  }
  navigate(itemMenu: AdminNavbarMenu | UserNavbarMenu) {

    let path = "";

    switch (itemMenu) {


      case this.userEnum.addClient:
        path = "/cliente-add";
        this.userMenu = itemMenu;
        break;

      case this.userEnum.addCampi:
        path = "/campi-add";
        this.userMenu = itemMenu;
        break;

      case this.userEnum.addReservation:
        path = "/reservation";
        this.userMenu = itemMenu;
        break;

      case this.userEnum.campo1:
        path = "/tesseramenti";
        this.userMenu = itemMenu;
        break;

      case this.userEnum.campo2:
        path = "/tesseramenti";
        this.userMenu = itemMenu;
        break;
      case this.userEnum.campo3:
        path = "/tesseramenti";
        this.userMenu = itemMenu;
        break;

      case this.userEnum.addTesserato:
        path = "/new-tess";
        this.userMenu = itemMenu;
        break;
    }
    this.router.navigate([path]);
  }
}





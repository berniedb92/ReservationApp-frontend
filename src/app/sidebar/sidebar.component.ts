import { outputAst } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { IconDefinition, faBars, faHome, faCalendarPlus, faUserPlus, faUserPen, faTableTennis, faUsersLine, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { AdminMenu, UserMenu } from './navbar.enum';
import { UtenteAnonimoService } from '../service/utente-anonimo.service';
import { icon } from '@fortawesome/fontawesome-svg-core';


interface ItemMenu {
  description: string;
  itemMenu: AdminMenu | UserMenu;
  icon: IconDefinition;
  paths: string[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarOpen: boolean = false;
  sidebarWidth: string = "3.5rem";
  margin = '18px'
  route: any = "";
  userEnum = UserMenu;
  userMenu: UserMenu = UserMenu.home;

  topbarUserList: Array<ItemMenu> = [
    {
      description: 'Comprimi',
      itemMenu: UserMenu.compress,
      icon: faBars,
      paths: []
    },
    {
      description: 'Home',
      itemMenu: UserMenu.home,
      icon: faHome,
      paths: [],
    },
    {
      description: 'Lista Clienti',
      itemMenu: UserMenu.listClient,
      icon: faUserGroup,
      paths: ["/cliente-list"],
    },
    {
      description: 'Aggiungi Cliente',
      itemMenu: UserMenu.addClient,
      icon: faUserPlus,
      paths: ["/cliente-add"],
    },
    {
      description: 'Campi',
      itemMenu: UserMenu.campi,
      icon: faTableTennis,
      paths: ["/campi-list"],
    },
    {
      description: 'Prenotazioni',
      itemMenu: UserMenu.reservation,
      icon: faCalendarPlus,
      paths: ["/reservation"],
    },
    {
      description: 'Tesserati',
      itemMenu: UserMenu.listTessera,
      icon: faUsersLine,
      paths: ["/tesseramenti"],
    },
    {
      description: 'Aggiungi Tesserato',
      itemMenu: UserMenu.addTesserato,
      icon: faUserPen,
      paths: ["/new-tess"],
    }
  ]
  constructor(private router:Router) {

  }
  ngOnInit(): void {

  }

  openCloseSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    if (this.sidebarOpen) {
      this.sidebarWidth = "12rem";
    } else {
      this.sidebarWidth = "3.5rem";
    }
  }



  navigate(itemMenu: AdminMenu | UserMenu) {

    let path = "";

    switch (itemMenu) {
      case this.userEnum.home:
        path = ""
        this.userMenu = itemMenu;
        break;

      case this.userEnum.listClient:
        path = "/cliente-list";
        this.userMenu = itemMenu;
        break;

      case this.userEnum.addClient:
        path = "/cliente-add";
        this.userMenu = itemMenu;
        break;

      case this.userEnum.campi:
        path = "/campi-list";
        this.userMenu = itemMenu;
        break;

      case this.userEnum.reservation:
        path = "/reservation";
        this.userMenu = itemMenu;
        break;

      case this.userEnum.listTessera:
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




  isSelected(value: AdminMenu | UserMenu) {

    return this.userMenu == value;

  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faBars, faHome, faCalendarPlus,faTableTennis, faUsersLine, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { AdminMenu, UserMenu } from './sidebar.enum';
import { AuthJwtService } from 'src/service/authJwt.service';


interface ItemMenu {
  description: any;
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
  faBars = faBars
  isLogged = true

  topbarUserList: Array<ItemMenu> = [
    // {
    //   description:'',
    //   itemMenu: UserMenu.compress,
    //   icon: faBars,
    //   paths: []
    // },
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
    }

  ]
  constructor(private router:Router, private auth: AuthJwtService) {
    this.auth.userSignedIn.subscribe(
      () => {
        this.isLogged = true
      }
    )
    this.auth.userLogOut.subscribe(
      () => {
        this.isLogged = false
      }
    )
  }
  ngOnInit(): void {
    this.isLogged = this.auth.isLogged()
  }

  openCloseSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    if (this.sidebarOpen) {
      this.sidebarWidth = "14rem";
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
        path = "/reservation/1";
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

      case this.userEnum.login:
        path = "/login";
        this.userMenu = itemMenu;
        break;

    }
    this.router.navigate([path]);
  }




  isSelected(value: AdminMenu | UserMenu) {

    return this.userMenu == value;

  }
}

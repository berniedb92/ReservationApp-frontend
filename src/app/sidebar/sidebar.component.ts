import { NavbarComponent } from './../navbar/navbar.component';
import { outputAst } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { IconDefinition, faBars, faHome, faCalendarPlus, faUserPlus, faUserPen, faTableTennis, faUsersLine, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { AdminMenu, UserMenu } from './sidebar.enum';
import { UtenteAnonimoService } from '../service/utente-anonimo.service';
import { icon } from '@fortawesome/fontawesome-svg-core';


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
  showImage = false
  @ViewChild(NavbarComponent) showImg!: NavbarComponent;

  topbarUserList: Array<ItemMenu> = [
  //   {
  //     description: `<div class="image-text">
  //     <span class="image">
  //         <!-- <img src="https://image.similarpng.com/very-thumbnail/2020/09/Tennis-Logo-on--transparent-background-PNG.png" alt="..."> -->
  //         <img src="/assets/images/logo.png">
  //     </span>
  // </div>`,
  //     itemMenu: UserMenu.compress,
  //     icon: faBars,
  //     paths: []
  //   },
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
    },
    {
      description: 'Login',
      itemMenu: UserMenu.login,
      icon: faUsersLine,
      paths: ["/login"],
    },

  ]
  constructor(private router:Router) {

  }
  ngOnInit(): void {

  }

  openCloseSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    if (this.sidebarOpen) {
      this.showImage = true
      this.showImg.show(true)
      this.sidebarWidth = "14rem";
    } else {
      this.showImage = false
      this.showImg.show(false)
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

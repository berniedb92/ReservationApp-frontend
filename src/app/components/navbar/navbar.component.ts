import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faCalendarPlus, faBars, faPlus, faUserPen, faUserPlus, IconDefinition, faTableTennis } from '@fortawesome/free-solid-svg-icons';

import { AdminNavbarMenu, UserNavbarMenu } from './navbar.enum';
import { AuthJwtService } from 'src/service/authJwt.service';
import { LoadingService } from 'src/service/loading.service';

interface ItemMenu {
  description: string;
  itemMenu: AdminNavbarMenu | UserNavbarMenu;
  icon: IconDefinition;
 paths: string[];
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // route: any;
  idUser : string = ''
  topbarUserList: Array<ItemMenu> = [];
  userEnum = UserNavbarMenu;
  userMenu: UserNavbarMenu | undefined;
  isloggedIn: boolean = false
  faBars= faBars
  @Output() openSide = new EventEmitter()

  constructor(private service: AuthJwtService, private router: Router, private route: ActivatedRoute, private loader: LoadingService) {

    this.router.events.subscribe((res) => {
      this.generateButtonNavbar(this.router.url)

    })

    this.service.userSignedIn.subscribe(
      () => {
        this.isloggedIn = true
        this.idUser = this.service.loggedUser()!
      }
    )

    this.service.userLogOut.subscribe(
      () => {
        this.isloggedIn = false;
      }
    );

  }

  ngOnInit(): void {
    this.isloggedIn = this.service.isLogged()
    this.idUser = this.service.loggedUser()!
  }

  open() {
    this.openSide.emit()
  }

logout(){
  this.loader.show()
  this.service.clearAll()
  this.router.navigate(['login']);
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
      case "/reservation/1": {
        [
          this.topbarUserList = [
            {
              description: "Aggiungi Prenotazione",
              itemMenu: UserNavbarMenu.addReservation,
              icon: faCalendarPlus,
              paths: [''],

            },
            {
              description: "Campo 1",
              itemMenu: UserNavbarMenu.campo1,
              icon: faTableTennis,
              paths: ["/reservation/1"],
            },
            {
              description: "Campo 2",
              itemMenu: UserNavbarMenu.campo2,
              icon: faTableTennis,
              paths: ["/reservation/2"],
            },
            {
              description: "Campo Padel",
              itemMenu: UserNavbarMenu.campo3,
              icon: faTableTennis,
              paths: ["/reservation/3"],
            }
          ]
        ]
      }
      break
      case "/reservation/2": {
          [
            this.topbarUserList = [
              {
                description: "Aggiungi Prenotazione",
                itemMenu: UserNavbarMenu.addReservation,
                icon: faCalendarPlus,
                paths: [''],

              },
              {
                description: "Campo 1",
                itemMenu: UserNavbarMenu.campo1,
                icon: faTableTennis,
                paths: ["/reservation/1"],
              },
              {
                description: "Campo 2",
                itemMenu: UserNavbarMenu.campo2,
                icon: faTableTennis,
                paths: ["/reservation/2"],
              },
              {
                description: "Campo Padel",
                itemMenu: UserNavbarMenu.campo3,
                icon: faTableTennis,
                paths: ["/reservation/3"],
              }
            ]
          ]
        }
        break
          case "/reservation/3": {
            [
              this.topbarUserList = [
                {
                  description: "Aggiungi Prenotazione",
                  itemMenu: UserNavbarMenu.addReservation,
                  icon: faCalendarPlus,
                  paths: [''],

                },
                {
                  description: "Campo 1",
                  itemMenu: UserNavbarMenu.campo1,
                  icon: faTableTennis,
                  paths: [""],
                },
                {
                  description: "Campo 2",
                  itemMenu: UserNavbarMenu.campo2,
                  icon: faTableTennis,
                  paths: ["/reservation/2"],
                },
                {
                  description: "Campo Padel",
                  itemMenu: UserNavbarMenu.campo3,
                  icon: faTableTennis,
                  paths: ["/reservation/3"],
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
        path = "/reservation/1";
        this.userMenu = itemMenu;
        break;

      case this.userEnum.campo2:
        path = "/reservation/2";
        this.userMenu = itemMenu;
        break;
      case this.userEnum.campo3:
        path = "/reservation/3";
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





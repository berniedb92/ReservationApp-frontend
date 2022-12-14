import { outputAst } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { IconDefinition,faBars,faHome,faCalendarPlus,faUserPlus,faUserLock,faMessage } from '@fortawesome/free-solid-svg-icons';
import { AdminMenu, UserMenu } from '../navbar/navbar.enum';
import { UtenteAnonimoService } from '../service/utente-anonimo.service';


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
  sidebarOpen :boolean =false;
  sidebarWidth:string="3.5rem";
  margin = '18px'
  route:any ="";
  userMenu: UserMenu = UserMenu.home;
  feedBack=faMessage;
  topbarUserList: Array<ItemMenu> = [
 
    {
      description: 'Home',
      itemMenu: UserMenu.home,
      icon: faHome,
      paths: [],
    },
    {
      description: 'Prenota',
      itemMenu: UserMenu.reservation,
      icon: faCalendarPlus,
      paths: [],
    },
    {
      description: 'Aggiungi Guidatore',
      itemMenu: UserMenu.addDriver,
      icon: faUserPlus,
      paths: [],
    },
    {
      description: 'Associa Guidatore',
      itemMenu: UserMenu.associateDriver,
      icon: faUserLock,
      paths: [],
    }
  ]
  constructor(elementRef:ElementRef){
   
  }
  ngOnInit(): void {

  }

openCloseSidebar  () {
    this.sidebarOpen = !this.sidebarOpen;
    if (this.sidebarOpen) {
      this.sidebarWidth = "15rem";
      this.margin = "140px"
    } else {
      this.sidebarWidth = "3.5rem";
      this.margin = '18px'
    }
  }
navigate(itemMenu:AdminMenu|UserMenu){

}

 isSelected(value: AdminMenu | UserMenu) {

      return this.userMenu == value;

}
}
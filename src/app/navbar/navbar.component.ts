import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
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

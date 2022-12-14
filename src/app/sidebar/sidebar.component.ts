import { outputAst } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { UtenteAnonimoService } from '../service/utente-anonimo.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sidebarOpen :boolean =false;
  sidebarWidth:string="3.5rem";
  margin = '18px'
  route:any ="";

  constructor(elementRef:ElementRef){
   elementRef;
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

}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { UtenteAnonimoService } from '../service/utente-anonimo.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  route:any ="";
  constructor(private service:UtenteAnonimoService){

  }
  ngOnInit(): void {
   console.log("ROTTAAAAAA",this.service.getUrl());
  }




}

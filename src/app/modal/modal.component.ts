import { Component, ElementRef, ViewEncapsulation,Input, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { UtenteAnonimoService } from '../service/utente-anonimo.service';
import { ModalService } from '../service/modal-service';

declare var $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {
  // @Input() id!: string;
  // private element: any;
  ciao:any;

  constructor() {

    // this.element = el.nativeElement;
  }

  ngOnInit(): void {
  //   $(document).ready(() => {
  //     this.ciao = 'Jquery is working !!!';
  // });
  //   $('#modal').on('shown.bs.modal', function () {
  //     $('#myInput').trigger('focus')
  //   })
  }

  /*
  // ensure id attribute exists
  if (!this.id) {
  console.error('modal must have an id');
  return;
  }

  // move element to bottom of page (just before </body>) so it can be displayed above everything else
  document.body.appendChild(this.element);

  // close modal on background click
  this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
  if (el.target.className === 'jw-modal') {
  this.close();
  }
  });

  // add self (this modal instance) to the modal service so it's accessible from controllers
  this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
  this.modalService.remove(this.id);
  this.element.remove();
  }

  // open modal
  open(): void {
  this.element.style.display = 'block';
  document.body.classList.add('jw-modal-open');
  }

  // close modal
  close(): void {
  this.element.style.display = 'none';
  document.body.classList.remove('jw-modal-open');
  }*/
}

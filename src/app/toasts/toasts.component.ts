import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.css']
})
export class ToastsComponent implements OnInit {

  toast: any;
  message: string = ''
  constructor() { }

  ngOnInit(): void {
    this.openSnackb(this.message)
  }

  openSnackb(message: any) {
    this.message = message;
    $(document).ready(function(){
      $("#myBtn").click(function(){
        $('.toast').toast('show');
      });
    });
  }

}

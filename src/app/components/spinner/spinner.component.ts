import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/service/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  loading$ = this.loader.loading$;

  constructor(public loader: LoadingService) { }

  ngOnInit(): void {
  }

}

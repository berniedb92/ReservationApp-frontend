import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error404',
  template: `
  <html>

  <head>
  <title> 404 Not Found </title>
  </head>

  <body>
  <p style="font-size: 40px; margin-top: 30px;"><b> Error 404 - Not Found </b></p>
  <div style="width: 28%; font-size: 16px;">
  <p>The requested URL was not found on this server.</p>
  <p>Additionally, a 404 Not Found error was encountered while trying to use an
  ErrorDocument to handle the request.</p>
  </div>
  </body>

  </html>`
})
export class Error404Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

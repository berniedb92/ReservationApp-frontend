import { AuthJwtService } from './../authJwt.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GestErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private auth: AuthJwtService, private snackbar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
        catchError(err => {

        console.log(err);

        var error : string = (err.status > 0) ? err.error.message || err.statusText : 'Errore Generico. Impossibile Proseguire!';

        if ([403].indexOf(err.status) !== -1) {
            this.router.navigate(['forbidden']);
        }

        return throwError(() => error);
    }))
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 3500,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}

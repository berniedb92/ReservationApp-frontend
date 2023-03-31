import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { AuthJwtService } from '../authJwt.service';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService  implements HttpInterceptor {

  constructor(private auth: AuthJwtService, private router: Router, private snackbar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth  = req.url.toLowerCase()

    if(auth.indexOf('/auth') != -1 ) {

      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status && error.status === 404) {
              this.router.navigate(['error404']);
          } else if (error.status && error.status === 401) {
              this.openSnackBar('nome utente o password errati!!','X')
          }
          else if (error.status && error.status === 403) {
              this.router.navigate(['error403']);
          }

          return throwError(error);
        }))
    }


    var AuthToken =  this.auth.getAuthToken();

    if (this.auth.loggedUser())
    {
      req = req.clone({
        setHeaders : {Authorization : AuthToken}
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status && error.status === 403) {
            this.router.navigate(['error403']);
        }
        else if (error.status && error.status === 401) {
          if(this.tokenExpired(this.auth.getAuthToken())) {
            this.openSnackBar('Sessione scaduta',"effettua di nuovo l'accesso!!")
            this.auth.clearAll()
            this.router.navigate(['login'])
          } else {
            this.router.navigate(['error401']);
          }
        }

        return throwError(error);
      })
    )

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

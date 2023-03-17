import { Router, RouterLink } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ParkInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router, private snackbar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const auth  = request.url.toLowerCase()

  if(auth.indexOf('/auth') != -1 ) {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status && error.status === 404) {
            this.router.navigate(['error404']);
        } else if (error.status && error.status === 401) {
            this.openSnackBar('nome utente o password errati!!','X')
        }
        else if (error.status && error.status === 403) {
            this.router.navigate(['error403']);
        }
        else if (error.status && error.status === 500) {
          this.router.navigate(['error500']);
      }

        return throwError(error);
      }))
  }

    const jsonReq = request.clone(
      {
        setHeaders: {
          Authorization: this.authService.getToken()
        }
      }
    );
    return next.handle(jsonReq)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status && error.status === 403) {
            this.router.navigate(['error403']);
        }
        else if (error.status && error.status === 500) {
          this.router.navigate(['error500']);
        }
        else if (error.status && error.status === 401) {
          if(this.tokenExpired(this.authService.getToken())) {
            this.openSnackBar('Sessione scaduta',"effettua di nuovo l'accesso!!")
            this.authService.logout()
            this.router.navigate(['login'])
          } else {
            this.router.navigate(['error401']);
          }
        }

        return throwError(error);
      }));
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

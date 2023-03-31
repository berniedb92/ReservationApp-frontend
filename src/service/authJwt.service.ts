import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppCookieService } from './app-cookie.service';
import { EventEmitter, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { LoadingService } from './loading.service';
import { Token } from 'src/app/model/Response';

@Injectable({
  providedIn: 'root'
})
export class AuthJwtService {

  server : string = environment.server;
  port : string = environment.port;
  userSignedIn = new EventEmitter()
  userLogOut = new EventEmitter()

  constructor(private httpClient : HttpClient, private storageService : AppCookieService, private loader: LoadingService) { }

  autenticaService(username: string, password: string) {

    return this.httpClient.post<Token>(
      `${environment.authServerUri}`, {username, password}).pipe(
        map(
          data => {
            console.log('loginnnnnnnnnnnnnnnn', data)
            this.storageService.set("Utente", username);
            this.storageService.set("AuthToken", `Bearer ${data.token}`)
            // sessionStorage.setItem("Utente", username);
            // sessionStorage.setItem("AuthToken", `Bearer ${data.token}`);
            this.userSignedIn.emit()
            return data;
          }
        )
      );

  }

  getAuthToken = () : string => {

    let AuthHeader : string = "";
    var AuthToken =  this.storageService.get("AuthToken");  //sessionStorage.getItem("AuthToken");

    if (AuthToken != null)
      AuthHeader = AuthToken;

    return AuthHeader;
  }

  loggedUser = (): string | null => (this.storageService.get("Utente")) ? this.storageService.get("Utente") : "";

  isLogged = (): boolean => (this.storageService.get("Utente")) ? true : false;
  // isLogged = (): boolean => (sessionStorage.getItem("Utente")) ? true : false;

  clearUser = (): void => this.storageService.remove("Utente");
  // clearUser = (): void => sessionStorage.removeItem("Utente");

  clearAll = (): void => {
    this.storageService.clear()
    // sessionStorage.clear()
    this.loader.hide()
    this.userLogOut.emit()
  }
}

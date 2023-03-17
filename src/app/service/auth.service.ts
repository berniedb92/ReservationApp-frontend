import { map } from 'rxjs/operators';
import { User } from './../model/user';
import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import {  BehaviorSubject, Observable, tap } from "rxjs";

export interface Jwt {
  token: string
}

@Injectable()
export class AuthService {
  isUserLogged = false;
  url: string;
  url2: string = 'http://localhost:9100/auth';

  userSignedIn = new EventEmitter()
  userSignedUp = new EventEmitter()
  userLogout = new EventEmitter()

  private $id: BehaviorSubject<number> = new BehaviorSubject(0);

    getId(): Observable<number> {
        return this.$id.asObservable();
    }

    setId(newId: number) {
        this.$id.next(newId);

    }

    private $new: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    getNew(): Observable<boolean> {
        return this.$new.asObservable();
    }

    setNew(ne: boolean) {
        this.$new.next(ne);

    }

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/auth/'
  }

  public isUserLoggedIn() {
    this.isUserLogged = !!sessionStorage.getItem("AuthToken");
    return this.isUserLogged;
  }

  login(username:string, password: string){

    return this.http.post<Jwt>(this.url2,{username, password}
    ).pipe(
      map(
      data => {

        sessionStorage.setItem("Utente", username)
        sessionStorage.setItem("AuthToken", `Bearer ${data.token}`)

        this.userSignedIn.emit()
        return data;
      })
      )
  }

  logout() {
    sessionStorage.removeItem("Utente")
    sessionStorage.removeItem("AuthToken")
    this.userLogout.emit()
    this.isUserLogged = false;
  }

  getUser = (): string | null => (sessionStorage.getItem("Utente")) ? sessionStorage.getItem("Utente") : "";

  getToken = (): string => {
    let authHeader: string = ""
    var authToken = sessionStorage.getItem("AuthToken")

    if(authToken != null)
      authHeader = authToken

    return authHeader;

  }

}

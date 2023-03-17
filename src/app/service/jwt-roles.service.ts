import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from "@angular/router";
import { Ruoli } from "../model/ruoli";

@Injectable({
  providedIn: 'root'
})
export class JwtRolesService {

  constructor(private auth:AuthService, private router: Router) { }

  getRoles(): string[] {

    let ruoli: string[] = new Array();
    let token: string = '';
    let items : any;

    token = this.auth.getToken()

    const helper = new JwtHelperService()
    const decodedToken = helper.decodeToken(token)
    items = decodedToken['authorities']

    console.log(items)

    if (!Array.isArray(items)) {
      ruoli.push(items)

    } else {
      ruoli = items
    }

    console.log(ruoli)
    return ruoli;

  }

}



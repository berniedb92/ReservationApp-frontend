import { JwtRolesService } from './jwt-roles.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  ruoli: string[] = new Array();

  constructor(private router: Router, private auth:AuthService, private roles: JwtRolesService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.ruoli = this.roles.getRoles();

    if(!this.auth.isUserLoggedIn()) {
      this.router.navigate(['login'], { queryParams: {nologged: true}})
      return false;

    } else {

      let roles: string[] = new Array();
      roles = route.data['roles']

      if(roles === null || roles.length === 0)
      {
        return true;
      } else if(this.ruoli.some(r => roles.includes(r)))
      {
        return true;
      }
      else
      {
        this.router.navigate(['error403']);
        return false;
      }
    }

  }

}



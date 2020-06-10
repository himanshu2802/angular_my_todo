import { Injectable } from '@angular/core';
import { isPromiseAlike } from 'q';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HardcodedAuthenticationService } from './hardcoded-authentication.service';
import { BasicAuthenticationService } from './basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(
    private router: Router,
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    if(this.basicAuthenticationService.isUserLoggedIn()) {
      console.log('inside routeGuard IF :::');
      return true;
    }
    else {
      console.log('inside routeGuard ELSE :::');
      this.router.navigate(['login']);
      return false;
    }
    
  }

}

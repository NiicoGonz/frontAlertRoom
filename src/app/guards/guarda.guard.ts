import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuardaGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem('rol') === 'G') {
      return true;
    } else {
      if (localStorage.getItem('rol') === 'A') {
        console.log('Estoy tratando de entrar como admin a  guarda');
        this.route.navigate(['/inicioAdmin']);
        return false;
      } else {
        if (localStorage.getItem('rol') === 'I') {
          console.log('Estoy tratando de entrar como instru a  guarda');
          this.route.navigate(['/inicioInstru']);
          return false;
        }
      }
      this.route.navigate(['/']);
      return false;
    }
  }
}

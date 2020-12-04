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
export class GuardLoginGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem('rol') === 'I') {
      console.log('Estoy tratando de entrar login    como Instru');
      this.route.navigate(['/inicioInstru']);
      return false;
    } else {
      if (localStorage.getItem('rol') === 'A') {
        console.log('Estoy tratando de entrar login    como admin');
        this.route.navigate(['/inicioAdmin']);
        return false;
      } else {
        if (localStorage.getItem('rol') === 'G') {
          console.log('Estoy tratando de entrar a login como   guarda ');
          this.route.navigate(['/inicioSegurityG']);
          return false;
        }
      }
      return true;
    }
  }
}

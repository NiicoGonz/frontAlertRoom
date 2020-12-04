import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class InstruGuard implements CanActivate {
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
     return true;
   } else {
     if (localStorage.getItem('rol') === 'A') {
       console.log('Estoy tratando de entrar como admin a  instru');
       this.route.navigate(['/inicioAdmin']);
       return false;
     } else {
       if (localStorage.getItem('rol') === 'G') {
         console.log('Estoy tratando de entrar como   guarda a instru');
         this.route.navigate(['/inicioSegurityG']);
         return false;
       }
     }
     this.route.navigate(['/']);
     return false;
   }
  }
}

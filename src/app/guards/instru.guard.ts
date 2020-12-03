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
    if (this.authService.checkToken()) {
      console.log('IF CAN ACTIVE instru');

      return true;
    } else {
      console.log('ELSE CAN instru');
      this.route.navigate(['']);
      return false;
    }
  }
}

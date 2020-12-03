import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private route: Router){}

  canActivate(

    // tslint:disable-next-line: max-line-length
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.checkToken()){
        console.log( 'IF CAN ACTIVE ADMIN');
        
        return true;
      }
      else{
        console.log('ELSE CAN ACTIVE');
        this.route.navigate(['']);
        return false;
      }

    }

  }

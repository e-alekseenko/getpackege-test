import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  Router,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { AuthService } from '@pages/auth/services/auth.service';
import { Observable } from 'rxjs';
import { ROUTER_UTILS } from '../utils/router.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    const isLoggedIn = this.authService.isLoggedIn;

    if (isLoggedIn) {
      return true;
    }

    const returnUrl = segments.map((s) => s.path).join('/');

    this.router.navigate(['/', ROUTER_UTILS.config.auth.signIn], {
      queryParams: { returnUrl },
    });

    return false;
  }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLoggedIn = this.authService.isLoggedIn;
    if (isLoggedIn) {
      return true;
    }
    return false;
  }
}

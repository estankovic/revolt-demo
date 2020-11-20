import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {$accessToken, $isLoggedIn, $refreshToken} from './auth.selectors';
import {map, take, tap, withLatestFrom} from 'rxjs/operators';
import {loginUserSuccess, refreshToken} from './auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly store: Store<any>, private readonly router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(select($isLoggedIn), take(1));
  }
}

@Injectable({
  providedIn: 'root',
})
export class AutoLoginGuard implements CanActivate {
  constructor(private readonly store: Store<any>, private readonly router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select($isLoggedIn),
      take(1),
      withLatestFrom(this.store.select($refreshToken)),
      tap(([isLoggedIn, token]) => {
        if (isLoggedIn) {
          // redirect to home
          this.store.dispatch(refreshToken({
            refresh_token: token
          }));
        } else {
          this.router.navigate(['login']);
        }
      }),
      map(([isLoggedIn]) => isLoggedIn)
    );
  }
}

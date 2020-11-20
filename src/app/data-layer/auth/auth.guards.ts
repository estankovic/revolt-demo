import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import {combineLatest, Observable, of} from 'rxjs';
import {catchError, delay, filter, map, take, tap} from 'rxjs/operators';
import {loginFromFromStorage} from './auth.actions';
import {AuthService} from './auth.service';

/**
 * Check whether user is logged in, by checking existence
 * of refreshToken, validating it, and then taking an action
 *
 * error handling is done bz interceptor so this checks onlz agains positive values
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly store: Store<any>,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const token = this.authService.getRefreshToken();
    return this.authService.refreshToken(token).pipe(
      map(res => {
        this.store.dispatch(loginFromFromStorage(res));
        return true;
      }),
      delay(0),
      take(1),
      catchError(err => {
        return of(true);
      })
    );
  }
}


@Injectable({
  providedIn: 'root',
})
export class AutoLogin implements CanActivate {
  constructor(
    private readonly store: Store<any>,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const token = this.authService.getRefreshToken();

    if (!token) {
      return of(true);
    }

    return this.authService.refreshToken(token).pipe(
      map(res => {
        // this.store.dispatch(loginFromFromStorage(res));
        // this.router.navigateByUrl('/vehicle-map', {replaceUrl: true});
        return true;
      }),
      delay(0),
      take(1),
      catchError(err => {
        return of(true);
      })
    );
  }
}

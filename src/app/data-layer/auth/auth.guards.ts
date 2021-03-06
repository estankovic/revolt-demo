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
import {loginFromFromStorage, logoutUser} from './auth.actions';
import {AuthService} from './auth.service';
import {AuthEffects} from './auth.effects';

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

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const token = await this.authService.getRefreshToken();
    return this.authService.refreshToken(token).pipe(
      map(res => {
        this.store.dispatch(loginFromFromStorage(res));
        return true;
      }),
      delay(0),
      take(1),
      catchError(err => {
        this.store.dispatch(logoutUser());
        return of(false);
      })
    ).toPromise();
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

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const token = await this.authService.getRefreshToken();

    if (!token) {
      return true;
    }

    return this.authService.refreshToken(token).pipe(
      map(res => {
        this.store.dispatch(loginFromFromStorage(res));
        this.router.navigateByUrl(AuthEffects.AFTER_LOGIN_URL, {replaceUrl: true});
        return true;
      }),
      delay(0),
      take(1),
      catchError(err => {
        return of(true);
      })
    ).toPromise();
  }
}

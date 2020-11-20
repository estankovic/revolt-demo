import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AuthService} from './auth.service';
import {catchError, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {
  loginFromFromStorage,
  loginUser,
  loginUserFail,
  loginUserSuccess, logoutUser,
  refreshToken,
  refreshTokenFail,
  refreshTokenSuccess
} from './auth.actions';
import {of} from 'rxjs';
import {$isLoggedIn} from './auth.selectors';

@Injectable()
export class AuthEffects {

  static TOKEN_LIFE_SPAN = 15000;
  static LOGIN_URL = '/login';
  static AFTER_LOGIN_URL = '/vehicle-map';

  login = createEffect(() => this.actions.pipe(
    ofType(loginUser),
    switchMap(action => this.authService.login(action).pipe(
      map(res => loginUserSuccess(res)),
      catchError(err => of(loginUserFail(err)))
    ))
  ));


  loginSuccess = createEffect(() => this.actions.pipe(
    ofType(loginUserSuccess),
    tap(() => {
      this.router.navigateByUrl(AuthEffects.AFTER_LOGIN_URL, {replaceUrl: true});
    })
  ), {dispatch: false});


  afterRefreshTokenReceived = createEffect(() => this.actions.pipe(
    ofType(loginUserSuccess, refreshTokenSuccess, loginFromFromStorage),
    tap<{refresh_token: string, access_token: string}>(({refresh_token}) => {
      this.authService.rememberToken(refresh_token);

      setTimeout(() => {
        this.store.dispatch(refreshToken({refresh_token}));
      }, AuthEffects.TOKEN_LIFE_SPAN);
    })
  ), {dispatch: false});

  refreshToken = createEffect(() => this.actions.pipe(
    ofType(refreshToken),
    withLatestFrom(this.store.select($isLoggedIn)),
    filter(([_, isLoggedIn]) => isLoggedIn),
    switchMap(([action]) => {
      return this.authService.refreshToken(action.refresh_token).pipe(
        map(res => refreshTokenSuccess(res)),
        catchError(err => of(refreshTokenFail(err)))
      );
    })
  ));

  logout = createEffect(() => this.actions.pipe(
    ofType(logoutUser),
    tap(() => {
      this.authService.removeRefreshToken();
      this.router.navigateByUrl(AuthEffects.LOGIN_URL, {replaceUrl: true});
    }),
  ), {dispatch: false});


  constructor(
    private readonly authService: AuthService,
    private readonly actions: Actions,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store<any>,
  ) {
  }
}

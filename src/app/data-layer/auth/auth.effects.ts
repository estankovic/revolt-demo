import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AuthService} from './auth.service';
import {loginUser, loginUserFail, loginUserSuccess, logoutUser, refreshToken, refreshTokenFail, refreshTokenSuccess} from './auth.actions';
import {catchError, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {$isLoggedIn, $refreshToken} from './auth.selectors';

@Injectable()
export class AuthEffects {

  private TOKEN_LIFE_SPAN = 15000;
  private LOGIN_URL_SEGMENTS = ['login'];
  private AFTER_LOGIN_URL_SEGMENTS = ['vehicle-map'];

  login = createEffect(() => this.actions.pipe(
    ofType(loginUser),
    switchMap(credentials => this.authService.login(credentials).pipe(
      map(tokens => loginUserSuccess(tokens)),
      catchError(err => of(loginUserFail(err)))
    ))
  ));

  loginSuccess = createEffect(() => this.actions.pipe(
    ofType(loginUserSuccess),
    tap((tokens) => {
      this.router.navigate(this.AFTER_LOGIN_URL_SEGMENTS);
    })
  ), {dispatch: false});

  refreshToken = createEffect(() => this.actions.pipe(
    ofType(refreshToken),
    switchMap(token => this.authService.refreshToken(token.refresh_token).pipe(
      map(tokens => refreshTokenSuccess(tokens)),
      catchError(err => of(refreshTokenFail(err)))
    ))
  ));

  afterTokenRetrieved = createEffect(() => this.actions.pipe(
    ofType(refreshTokenSuccess, loginUserSuccess),
    tap<{refresh_token: string; access_token: string}>((tokens) => {
      this.authService.rememberToken(tokens.refresh_token);
    }),
    map(tokens => tokens.refresh_token),
    withLatestFrom(this.store.select($isLoggedIn)),
    filter(([_, isLoggedIn]) => isLoggedIn),
    tap(([token, __]) => {
      // todo refactor this to use ngrx
      setTimeout(() => {
        this.store.dispatch(refreshToken({refresh_token: token}));
      }, this.TOKEN_LIFE_SPAN);
    })
  ), {dispatch: false});

  logout = createEffect(() => this.actions.pipe(
    ofType(logoutUser),
    tap(() => this.authService.logout()),
    tap(() => this.router.navigate(this.LOGIN_URL_SEGMENTS))
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

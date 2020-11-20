import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AuthService} from './auth.service';
import {loginUser, loginUserFail, loginUserSuccess, refreshToken, refreshTokenFail, refreshTokenSuccess} from './auth.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class AuthEffects {

  login = createEffect(() => this.actions.pipe(
    ofType(loginUser),
    switchMap(credentials => this.authService.login(credentials).pipe(
      map(tokens => loginUserSuccess(tokens)),
      catchError(err => of(loginUserFail(err)))
    ))
  ));

  refreshToken = createEffect(() => this.actions.pipe(
    ofType(refreshToken),
    switchMap(token => this.authService.refreshToken(token.refresh_token).pipe(
      map(tokens => refreshTokenSuccess(tokens)),
      catchError(err => of(refreshTokenFail(err)))
    ))
  ));

  constructor(
    private readonly authService: AuthService,
    private readonly actions: Actions,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store<any>,
  ) {
  }
}

import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AuthService} from './auth.service';

@Injectable()
export class AuthEffects {

  private TOKEN_LIFE_SPAN = 15000;
  private LOGIN_URL_SEGMENTS = ['login'];
  private AFTER_LOGIN_URL_SEGMENTS = ['vehicle-map'];


  constructor(
    private readonly authService: AuthService,
    private readonly actions: Actions,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store<any>,
  ) {
  }
}

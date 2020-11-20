import { createAction, props } from '@ngrx/store';

export const loginUser = createAction(
  '[Auth] - Login',
  props<{
    login: string;
    password: string;
  }>(),
);

export const loginUserSuccess = createAction(
  '[Auth] - Login Success',
  props<{
    access_token: string;
    refresh_token: string;
  }>(),
);

export const loginUserFail = createAction(
  '[Auth] - Login Fail',
  props<{
    err: any;
  }>(),
);

export const loginFromFromStorage = createAction(
  '[Auth] - Login from Storage',
  props<{
    access_token: string;
    refresh_token: string;
  }>()
);

export const refreshToken = createAction(
  '[Auth] - Refresh Token',
  props<{
    refresh_token: string;
  }>(),
);

export const refreshTokenSuccess = createAction(
  '[Auth] - Refresh Token Success',
  props<{
    access_token: string;
    refresh_token: string;
  }>(),
);

export const refreshTokenFail = createAction(
  '[Auth] - Refresh Token Fail',
  props<{
    err: any;
  }>(),
);

export const logoutUser = createAction('[Auth] - Logout');

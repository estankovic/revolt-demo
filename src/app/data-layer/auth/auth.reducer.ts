import { Action, createReducer, on } from '@ngrx/store';
import {
  loginFromFromStorage,
  loginUser,
  loginUserFail,
  loginUserSuccess,
  logoutUser,
  refreshToken,
  refreshTokenFail,
  refreshTokenSuccess
} from './auth.actions';

export interface AuthState {
  loading: boolean;
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
}

export const initAuthState: AuthState = {
  loading: false,
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null
};

const reducer = createReducer(
  initAuthState,
  on(loginUser, state => ({
    ...state,
    loading: true,
  })),
  on(loginUserSuccess, (state, {access_token, refresh_token}) => ({
    ...state,
    loading: false,
    isLoggedIn: true,
    accessToken: access_token,
    refreshToken: refresh_token
  })),
  on(loginUserFail, state => ({
    ...state,
    loading: false,
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null
  })),
  on(refreshToken, state => ({
    ...state,
    loading: true,
  })),
  on(refreshTokenSuccess, loginFromFromStorage, (state, {refresh_token, access_token}) => ({
    ...state,
    loading: false,
    refreshToken: refresh_token,
    accessToken: access_token,
    isLoggedIn: true
  })),
  on(refreshTokenFail, state => ({
    ...state,
    loading: false,
  })),
  on(logoutUser, state => ({
    ...initAuthState
  }))
);

export function authReducer(state: AuthState, action: Action): AuthState {
  return reducer(state, action);
}

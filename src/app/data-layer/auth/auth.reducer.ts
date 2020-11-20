import { Action, createReducer, on } from '@ngrx/store';
import { loginUser, loginUserFail, loginUserSuccess, logoutUser } from './auth.actions';

export interface AuthState {
  loading: boolean;
  access_token: string;
  refresh_token: string;
}

const initState: AuthState = {
  loading: false,
  access_token: null,
  refresh_token: null,
};

const reducer = createReducer(
  initState,
  on(loginUser, state => ({
    ...state,
    loading: true,
  })),
  on(loginUserSuccess, (state, {access_token, refresh_token}) => ({
    ...state,
    loading: false,
    access_token,
    refresh_token
  })),
  on(loginUserFail, state => ({
    ...state,
    loading: false,
  })),
  on(logoutUser, state => ({
    ...initState
  })),
);

export function authReducer(state: AuthState, action: Action): AuthState {
  return reducer(state, action);
}

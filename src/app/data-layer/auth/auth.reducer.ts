import { Action, createReducer, on } from '@ngrx/store';
import {loginUser, loginUserFail, loginUserSuccess, logoutUser, refreshTokenSuccess} from './auth.actions';

export interface AuthState {

}

export const initAuthState: AuthState = {

};

const reducer = createReducer(
  initAuthState,
  on(loginUser, state => ({
    ...state,
    loading: true,
  })),
);

export function authReducer(state: AuthState, action: Action): AuthState {
  return reducer(state, action);
}

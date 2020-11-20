import {Action, ActionReducer} from '@ngrx/store';
import {AuthState, initAuthState} from './auth.reducer';

export function authMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>) {
  let onInit = true; // after load/refresh…

  return (state, action) => {
    const nextState: any = reducer(state, action);

    if (onInit) {
      const refreshToken = localStorage.getItem('refresh_token');

      const nextAuthState: AuthState = {
        ...initAuthState,
        refresh_token: refreshToken
      };

      return {
        ...nextState,
        auth: {...nextAuthState}
      };
    }

    onInit = false;
    return nextState;
  };
}

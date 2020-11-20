import {Action, ActionReducer} from '@ngrx/store';

export function authMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>) {
  let onInit = true; // after load/refresh…

  return (state, action) => {
    const nextState: any = reducer(state, action);

    if (onInit) {
      const refreshToken = localStorage.getItem('refresh_token');

      return {
        ...nextState,
        auth: {
          ...nextState.auth,
          refresh_token: refreshToken,
        }
      };
    }

    onInit = false;
    return nextState;
  };
}

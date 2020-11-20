import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

const featureSelector = createFeatureSelector<AuthState>('auth');

export const $accessToken = createSelector(featureSelector, state => state.access_token);
export const $refreshToken = createSelector(featureSelector, state => state.refresh_token);
export const $isRefreshTokenLoaded = createSelector(featureSelector, state => state.refresh_token_loaded);
export const $isManuallyLoggedOut = createSelector(featureSelector, state => state.isManuallyLoggedOut);

export const $isLoading = createSelector(featureSelector, state => state.loading);


export const $isLoggedIn = createSelector(
  $accessToken,
  (accessToken) => !!accessToken,
);

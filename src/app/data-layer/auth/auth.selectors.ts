import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

const featureSelector = createFeatureSelector<AuthState>('auth');

export const $accessToken = createSelector(featureSelector, state => state.access_token);
export const $refreshToken = createSelector(featureSelector, state => state.refresh_token);
const loggedInStatus = createSelector(featureSelector, state => state.loggedIn);

export const $isLoading = createSelector(featureSelector, state => state.loading);


export const $isLoggedIn = createSelector(
  $accessToken,
  loggedInStatus,
  (accessToken, isLoggedIn) => (accessToken != null && isLoggedIn),
);

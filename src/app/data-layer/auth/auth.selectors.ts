import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

const featureSelector = createFeatureSelector<AuthState>('auth');

export const $accessToken = createSelector(featureSelector, state => state.accessToken);
export const $refreshToken = createSelector(featureSelector, state => state.refreshToken);

export const $isLoggedIn = createSelector(featureSelector, state => state.isLoggedIn);

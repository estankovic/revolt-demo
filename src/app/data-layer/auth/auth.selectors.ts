import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

const featureSelector = createFeatureSelector<AuthState>('auth');



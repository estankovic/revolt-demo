import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './vehicles.reducer';

const featureSelector = createFeatureSelector<AuthState>('vehicles');

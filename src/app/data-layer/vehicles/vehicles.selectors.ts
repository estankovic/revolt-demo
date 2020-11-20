import { createFeatureSelector, createSelector } from '@ngrx/store';
import {vehiclesAdapter, VehiclesState} from './vehicles.reducer';

const featureSelector = createFeatureSelector<VehiclesState>('vehicles');

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = vehiclesAdapter.getSelectors();


const vehicleEntities = createSelector(featureSelector, state => selectEntities(state));


const inMyRangeData = createSelector(featureSelector, state => state.inMyRange);
const inMyRangeDataVehicleIds = createSelector(inMyRangeData, state => state.ids);
const inMyRangeDataLoading = createSelector(inMyRangeData, state => state.loading);
const inMyRangeDataLoaded = createSelector(inMyRangeData, state => state.loaded);

export const $vehiclesInMyRange = createSelector(
  vehicleEntities,
  inMyRangeDataVehicleIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

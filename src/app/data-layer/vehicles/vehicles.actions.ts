import {createAction, props} from '@ngrx/store';
import {LatLngLiteral} from 'leaflet';
import {Vehicle} from './vehicle.interface';

export const loadVehiclesAroundLocation = createAction(
  '[Vehicles] - Load Vehicles Around the Location',
  props<{
    location: LatLngLiteral
  }>(),
);

export const loadVehiclesAroundLocationSuccess = createAction(
  '[Vehicles] - Load Vehicles Around the Location Success',
  props<{
    vehicles: Vehicle[]
  }>(),
);

export const loadVehiclesAroundLocationFail = createAction(
  '[Vehicles] - Load Vehicles Around the Location Fail',
  props<{
    err: any
  }>(),
);

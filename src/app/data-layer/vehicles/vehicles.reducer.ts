import {Action, createReducer} from '@ngrx/store';
import {EntityState} from '@ngrx/entity/src/models';
import {Vehicle} from './vehicle.interface';
import {createEntityAdapter} from '@ngrx/entity';
import {LatLngLiteral} from 'leaflet';

export interface VehiclesState extends EntityState<Vehicle> {
  loading: boolean;
  loaded: boolean;
  location: LatLngLiteral;
  inMyRange: string[];
}

export const vehiclesAdapter = createEntityAdapter<Vehicle>();

const initState: VehiclesState = vehiclesAdapter.getInitialState({
  loaded: false,
  loading: false,
  location: {
    lat: null,
    lng: null
  },
  inMyRange: [],
});

// lat: 50.08804,
// lng: 14.42076,

const reducer = createReducer(
  initState,
);

export function vehiclesReducer(state: VehiclesState, action: Action): VehiclesState {
  return reducer(state, action);
}

import {Action, createReducer, on} from '@ngrx/store';
import {EntityState} from '@ngrx/entity/src/models';
import {Vehicle} from './vehicle.interface';
import {createEntityAdapter} from '@ngrx/entity';
import {LatLngLiteral} from 'leaflet';
import {loadVehiclesAroundLocation, loadVehiclesAroundLocationSuccess} from './vehicles.actions';

export interface VehiclesState extends EntityState<Vehicle> {
  location: LatLngLiteral;
  inMyRange: {
    loading: boolean;
    loaded: boolean;
    ids: string[];
  };
}

export const vehiclesAdapter = createEntityAdapter<Vehicle>();

const initState: VehiclesState = vehiclesAdapter.getInitialState({
  location: {
    lat: null,
    lng: null
  },
  inMyRange: {
    loaded: false,
    loading: false,
    ids: []
  },
});

// lat: 50.08804,
// lng: 14.42076,

const reducer = createReducer(
  initState,
  on(loadVehiclesAroundLocation, (state) => ({
    ...state,
    inMyRange: {
      ...state.inMyRange,
      loading: true
    }
  })),
  on(loadVehiclesAroundLocationSuccess, (state, {vehicles}) => ({
    ...state,
    ...vehiclesAdapter.addMany(vehicles, state),
    inMyRange: {
      ...state.inMyRange,
      loading: false,
      loaded: true,
      ids: vehicles.map(v => v.id)
    }
  })),
  on(loadVehiclesAroundLocationSuccess, (state, {vehicles}) => ({
    ...state,
    inMyRange: {
      ...state.inMyRange,
      loading: false,
      loaded: false,
    }
  }))
);

export function vehiclesReducer(state: VehiclesState, action: Action): VehiclesState {
  return reducer(state, action);
}

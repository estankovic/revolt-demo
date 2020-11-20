import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {VehiclesService} from './vehicles.service';
import {loadVehiclesAroundLocation, loadVehiclesAroundLocationSuccess} from './vehicles.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class VehiclesEffects {

  loadVehicles = createEffect(() => this.actions.pipe(
    ofType(loadVehiclesAroundLocation),
    switchMap(({location}) => this.vehicleService.getVehicles(location).pipe(
      map(vehicles => loadVehiclesAroundLocationSuccess({vehicles})),
      catchError(err => of(err))
    ))
  ));

  constructor(
    private readonly vehicleService: VehiclesService,
    private readonly actions: Actions,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store<any>,
  ) {
  }
}

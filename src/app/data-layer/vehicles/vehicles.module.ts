import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {VehiclesEffects} from './vehicles.effects';
import {vehiclesReducer} from './vehicles.reducer';
import {VehiclesService} from './vehicles.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('vehicles', vehiclesReducer),
    EffectsModule.forFeature([VehiclesEffects])
  ],
  providers: [
    VehiclesService,
  ]
})
export class VehiclesModule {
}

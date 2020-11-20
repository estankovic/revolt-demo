import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleMapPageRoutingModule } from './vehicle-map-routing.module';

import { VehicleMapPage } from './vehicle-map.page';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleMapPageRoutingModule,
    SharedModule
  ],
  declarations: [VehicleMapPage]
})
export class VehicleMapPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapComponent} from './components/map/map.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';



@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent],
  imports: [
    CommonModule,
    LeafletModule
  ]
})
export class SharedModule { }

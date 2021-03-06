import { Component, OnInit } from '@angular/core';
import {MapOptions, tileLayer} from 'leaflet';
import {Store} from '@ngrx/store';
import {loadVehiclesAroundLocation} from '../../data-layer/vehicles/vehicles.actions';
import {$vehiclesInMyRange} from '../../data-layer/vehicles/vehicles.selectors';

@Component({
  selector: 'rvt-vehicle-map',
  templateUrl: './vehicle-map.page.html',
  styleUrls: ['./vehicle-map.page.scss'],
})
export class VehicleMapPage implements OnInit {

  options: MapOptions = {
    layers: [
      tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 })
    ]
  };

  position = {
    lat: 50.08804,
    lng: 14.42076,
    zoom: 13,
  };

  vehicles$ = this.store.select($vehiclesInMyRange);

  constructor(private readonly store: Store) { }

  ngOnInit() {
    this.store.dispatch(loadVehiclesAroundLocation({
      location: {
        lat: this.position.lat,
        lng: this.position.lng,
      }
    }));
  }

}

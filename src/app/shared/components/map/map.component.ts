import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {icon, latLng, LayerGroup, layerGroup, Map, MapOptions, Marker, marker} from 'leaflet';
import {Vehicle} from '../../../data-layer/vehicles/vehicle.interface';

@Component({
  selector: 'rvt-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges {

  // tslint:disable-next-line:variable-name
  private _vehicles: Vehicle[];

  private vehicleLayer: LayerGroup;

  @Input() options: MapOptions;

  @Input() lat: number;
  @Input() lng: number;
  @Input() zoom: number;

  @Input()
  set vehicles(vehicles: Vehicle[]) {
    this._vehicles = vehicles;
    this.renderVehicles();
  }


  private mapInstance: Map;

  constructor() { }

  ngOnInit() {}

  onReady(map: Map) {

    this.mapInstance = map;

    this.updatePosition();

    setTimeout(() => {
      map.invalidateSize();
    }, 500);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.mapInstance) {
      this.updatePosition();
      this.renderVehicles();
    }
  }

  updatePosition() {
    if (!this.mapInstance) {
      return;
    }

    this.mapInstance.setView(latLng(this.lat, this.lng), this.zoom);
  }

  renderVehicles() {
    if (!this.mapInstance) {
      return;
    }

    if (this.vehicleLayer) {
      this.vehicleLayer.removeFrom(this.mapInstance);
    }

    const markers: Marker[] = this._vehicles
      .map(vehicle => marker(
        [vehicle.lat, vehicle.lng],
        {icon: icon({
            iconSize: [ 25, 41 ],
            iconAnchor: [ 13, 41 ],
            iconUrl: 'assets/leaflet-icons/marker-icon.png',
            shadowUrl: 'assets/leaflet-icons/marker-shadow.png'
          })}
      ));

    this.vehicleLayer = layerGroup(markers).addTo(this.mapInstance);
  }

}

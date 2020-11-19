import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {latLng, Map, MapOptions} from 'leaflet';

@Component({
  selector: 'rvt-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges {

  @Input() options: MapOptions;

  @Input() lat: number;
  @Input() lng: number;
  @Input() zoom: number;


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
    }
  }

  updatePosition() {
    this.mapInstance.setView(latLng(this.lat, this.lng), this.zoom);
  }

}

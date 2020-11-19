import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {latLng, MapOptions, tileLayer} from 'leaflet';

@Component({
  selector: 'rvt-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  options: MapOptions = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 })
    ]
  };

  position = {
    lat: 50.08804,
    lng: 14.42076,
    zoom: 13,
  };

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Vehicle} from './vehicle.interface';
import {Observable} from 'rxjs';
import {LatLngLiteral} from 'leaflet';


@Injectable()
export class VehiclesService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  getVehicles(location: LatLngLiteral): Observable<Vehicle[]> {

    const headers = new HttpHeaders({
      'X-Device-Lat': location.lat.toString(),
      'X-Device-Lng': location.lng.toString(),
    });

    return this.http.get<{vehicles: Vehicle[]}>(`https://dev.revolt.city/api/vehicles-fast`, {headers}).pipe(
      map(res => res.vehicles)
    );
  }

}

import { Injectable } from '@angular/core';
import { WOOTOW_URL } from 'src/app/enviroments/scope';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs/internal/Observable';
import { CustomerServices } from '../../models/services.class';
import { ServiceCoords } from '../../models/client-coords.class';
import { MarkerOption } from '../../models/map-markers.class';

@Injectable({
  providedIn: 'root'
})
export class ClientServicesService {
  public working: boolean = false;
  public ServiceCoordsInProcess: ServiceCoords[] = [];
  public renderMarkers: MarkerOption;
  public ServiceInProcess: boolean = false;
  constructor(private _http: HttpClient) { }

  // Para obtener los servicios de la ciudad del gruero
  GetAvailableServicesByCity(_city: string) {
    const url = `${WOOTOW_URL}/admin/cities/rate/google/reverse/zones?city=${_city}`;
    return this._http.get(url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: Observable<string | Boolean> | any) => {
        return new Observable<string | boolean>(err);
      }),
   );
  }
  // Servicios para desplegar la tarjeta con la información del cliente
  GetAllDataClient(_key: string) {
    const url = `${WOOTOW_URL}/client/services/profile/${_key}`;
    return this._http.get(url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: Observable<string | Boolean> | any) => {
        return new Observable<string | boolean>(err);
      }),
   );
  }
  // Datos economicos acerca del servicio que solicito el cliente
  GetPaymentInfoToProvider(_keyOperation: string) {
    const url = `${WOOTOW_URL}/client/services/economic/service/${_keyOperation}`;
    return this._http.get(url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: Observable<string | Boolean> | any) => {
        return new Observable<string | boolean>(err);
      }),
   );
  }
  // Aceptar el servicio del cliente
  ActivateServiceRouting(dataService: CustomerServices) {
    const url = `${WOOTOW_URL}/client/services/track/${dataService._id}`;
    return this._http.put(url, dataService).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: Observable<string | Boolean> | any) => {
        return new Observable<string | boolean>(err);
      }),
   );
  }
  // Cargamos las rutas en proceso del gruero
  // Sirve para mostrar en el mapa las rutas que estan en curso
  ServicesOnCurse(driverTow: string) {
    const url = `${WOOTOW_URL}/client/services/track/routing/${driverTow}`;
    return this._http.get(url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: Observable<string | Boolean> | any) => {
        return new Observable<string | boolean>(err);
      }),
   );
  }
}

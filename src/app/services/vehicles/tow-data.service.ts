import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WOOTOW_URL } from 'src/app/enviroments/scope';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs/internal/Observable';
import { TowData } from 'src/app/models/tow_data.class';

@Injectable({
  providedIn: 'root'
})
export class TowDataService {

  constructor(private _http: HttpClient) { }

  loadVehicleData(_id: string) {
    const url = `${WOOTOW_URL}/admin/employers/membership/session/provider/${_id}`;
    return this._http.get(url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: Observable<string | Boolean> | any) => {
        return new Observable<string | boolean>();
      }),
   );
  }
  // Crea datos del vehiculo que quiere asociar el conductor
  UploadNewVehicleData(towDataVehicle: TowData, _IdProvider: string) {
    const url = `${WOOTOW_URL}/employer/membership/Tow/Car/${_IdProvider}`;
    return this._http.post(url, towDataVehicle).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: Observable<string | Boolean> | any) => {
        return new Observable<string | boolean>();
      }),
   );
  }
  // Cargamos la foto de la grua con la id que fue creada con el metodo UploadNewVehicleData()
  uploadPictureTow(image: File, towId: string) {
    const url = `${WOOTOW_URL}/upload/employers/${towId}/towImage`;
    const TowPicture = new FormData();
    TowPicture.append('image', image, image.name);
    return this._http.put(url, TowPicture).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: Observable<string | Boolean> | any) => {
        return new Observable<string | boolean>();
      }),
   );
  }
}

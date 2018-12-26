import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WOOTOW_URL } from 'src/app/enviroments/scope';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private _http: HttpClient) {}

  // Obtener lista de documentos del usuario en caso de tener alguno ya cargado
  getDocsByProvider(_id: string) {
    const url = `${WOOTOW_URL}/admin/documents/provider/${_id}`;
    return this._http.get(url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: Observable<string | Boolean> | any) => {
        return new Observable<string | boolean>();
      }),
   );
  }
  // Cargar documentos al sistema
  LoadDocByProvider(image: File, _id: string, operationType: string, imageType?: string) {
    let url = `${WOOTOW_URL}/legacy/upload/employers`;
    url += `/${_id}/${operationType}?${imageType}`;
    const formData = new FormData();
    formData.append('image', image, image.name);
    return this._http.post(url, formData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: Observable<string | Boolean> | any) => {
        return new Observable<string | boolean>();
      }),
   );
  }
}

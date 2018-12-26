import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ObjectDriver } from '../../models/drivers.class';
import { WOOTOW_URL } from 'src/app/enviroments/scope';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public _token: string;
  public _id: string;
  public clientDriverObject: ObjectDriver;
  constructor(private _router: Router, private _http: HttpClient) {
    this.loadWebData(); // Verificamos si ya esta autenticado
  }
  public invalidCredential: boolean = false;
  /* Login Driver into app */
  LoginDriver(objectCli: ObjectDriver) {
    const url = `${WOOTOW_URL}/employer/login/auth`;
    return this._http.post(url, objectCli).pipe(
        map((response: any) => {
          this.invalidCredential = false;
          return response;
        }),
        catchError((err: Observable<string | Boolean> | any) => {
           // Invalid credentials
          if (!err.error.status && (err.error.statusCode === 400)) {
            this.invalidCredential = true;
          }
          return new Observable<string | boolean>();
        }),
    );
  }
  /* End login driver */
  /* Register */
  RegisterDriver(objectCli: ObjectDriver) {
    const url = `${WOOTOW_URL}/employer/login`;
    return this._http.post(url, objectCli).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: Observable<string | Boolean> | any) => {
        return new Observable<string | boolean>();
      }),
   );
  }
  /* End Register */
  /* Storage */
  SaveDataStorage(_id: string, token: string, objectDriver: ObjectDriver): boolean {
      localStorage.setItem('_id', _id);
      localStorage.setItem('token', token);
      localStorage.setItem('driver', JSON.stringify(objectDriver));
      this._id = _id;
      this._token = token;
      this.clientDriverObject = objectDriver;
      return true;
  }
  logout(): void {
    this._token = '';
    this._id = '';
    this.clientDriverObject = null;
    localStorage.removeItem('_id');
    localStorage.removeItem('token');
    localStorage.removeItem('driver');
    this._router.navigate(['/public/driver/login']);
  }
  loadWebData(): void {
    this._token = localStorage.getItem('token') || '';
    this._id = localStorage.getItem('_id') || '';
    this.clientDriverObject = JSON.parse(localStorage.getItem('driver')) || null;
  }
  logged(): boolean {
    return (this.clientDriverObject !== null && this.clientDriverObject !== undefined) ? true : false;
  }
  authorized(): boolean {
    const ObjectProvider: ObjectDriver = JSON.parse(localStorage.getItem('driver'));
    if ((ObjectProvider.authorized) || (ObjectProvider.statusWork)) {
      return true;
    } else {
      return false;
    }
  }
  /* End Storage */
}

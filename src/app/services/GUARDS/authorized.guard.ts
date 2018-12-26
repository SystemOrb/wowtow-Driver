import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {
  constructor(private _auth: AuthService, private _route: Router) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._auth.logged()) {
      // Si esta logeado entonces verificamos que este autorizado por el sistema
      // Es decir que cargo los documentos y fueron aceptados
      if (this._auth.authorized()) {
        return true;
      } else {
        this._route.navigate(['/public/driver/validation']);
      }
    } else {
      return false;
    }
  }
}

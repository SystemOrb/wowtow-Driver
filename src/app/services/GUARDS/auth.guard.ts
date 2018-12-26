import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _auth: AuthService) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._auth.logged()) {
      return true;
    } else {
      this._router.navigate(['/public/driver/login']);
    }
  }
}

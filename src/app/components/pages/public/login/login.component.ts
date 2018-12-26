import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { ObjectDriver } from '../../../../models/drivers.class';
import { PartialObserver } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalid: boolean = false;
  loader: boolean = false;
  constructor(public _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }
  AuthDriver(formData: NgForm) {
    if (formData.invalid) {
      swal('Error', 'Form invalid please complete correcly', 'error');
      return;
    }
    const ObjectAuth = new ObjectDriver(null, formData.value.email, null, null, formData.value.password);
    this.loader = true;
    this._auth.LoginDriver(ObjectAuth).subscribe(
      (observer: PartialObserver<any> | any): void => {
        if (observer.status) {
          // Save data for this client
          if (this._auth.SaveDataStorage(observer.data._id, observer.token, observer.data)) {
            // Verificamos si el cliente esta habilitado como conductor (documentos)
            // En caso de que lo este, lo mandamos al mapa, sino al sistema de validacion
            if ((!observer.data.authorized)) {
              setTimeout((): void => {
                this._router.navigate(['/public/driver/validation']);
             }, 3000);
             return;
            } else {
              setTimeout((): void => {
                this._router.navigate(['/home']);
             }, 3000);
             return;
            }
          }
        }
      },
    );
  }

}

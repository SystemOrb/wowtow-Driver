import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { ObjectDriver } from '../../../../models/drivers.class';
import { PartialObserver } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Registered: boolean = false;
  loader: boolean = false;
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }
  RegisterDriver(formData: NgForm) {
    if (formData.invalid) {
      swal('Error', 'Please complete the form correctly', 'error');
      return;
    }
    const fullname = formData.value.firstname + ' ' + formData.value.lastname;
    const ObjectClient = new ObjectDriver(fullname, formData.value.email, formData.value.city,
      formData.value.phone, formData.value.password);
      this._auth.RegisterDriver(ObjectClient).subscribe(
        (observer: PartialObserver<any> | any): void => {
          if (observer.status) {
            // Salvamos la data en el localStorage del cliente
            if (this._auth.SaveDataStorage(observer.gruero._id, observer.token, observer.gruero)) {
              this.Registered = true;
              setTimeout((): void => {
                 this._router.navigate(['/public/driver/validation']);
              }, 2000);
            }
          }
        }
      );
  }
}

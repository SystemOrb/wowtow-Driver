import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientServicesService } from '../../../services/maps/client-services.service';
import { ObjectClientCarAllData } from '../../../models/client-mvc-class';
import { PartialObserver } from 'rxjs';
import { TransactionForService } from '../../../models/client-transaction.class';
import { AuthService } from '../../../services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { CustomerServices } from 'src/app/models/services.class';
import swal from 'sweetalert';
import { StaticCoords } from '../../../models/static-coords.class';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css']
})
export class CustomerCardComponent implements OnInit, OnDestroy {
  ClientProfile: ObjectClientCarAllData;
  TransactionRef: TransactionForService;
  Coords: StaticCoords;
  loading: boolean = false;
  constructor(public customerDialog: MatDialogRef<CustomerCardComponent>,
    @Inject(MAT_DIALOG_DATA) public key: any, private _customer: ClientServicesService,
    public _auth: AuthService) { }

  async ngOnInit() {
    const profile = await this.GetClientProfile(this.key.customerKey);
    const economic = await this.GetEconomicData(this.key.payment_ref);
    // Tabla cliente & Vehiculo
    if (profile !== null && profile !== undefined) {
      this.ClientProfile = profile;
    }
    // Tabla de datos de pago
    if (economic !== null && economic !== undefined) {
      this.TransactionRef = economic;
    }
    // Indicamos las coordenadas
    this.Coords = {
      fromLat: this.key.fromLng,
      fromLng: this.key.fromLat,
      toLat: this.key.toLat,
      toLng: this.key.toLng
    };
  }
  ngOnDestroy() {
    this.ClientProfile = null;
    this.TransactionRef = null;
  }
  closeModal(data: any): void {
    this.customerDialog.close(data);
  }
  // Obtener el perfil del vehiculo y datos del cliente que solicita el servicio
  // Invocamos una promesa que devolvera los datos del cliente que solicita el servicio
  GetClientProfile(_keyCustomer: string): Promise<ObjectClientCarAllData> {
    return new Promise((resolve, reject) => {
      this._customer.GetAllDataClient(_keyCustomer).subscribe(
        (observer: PartialObserver<any> | any): void => {
          if (observer.status) {
            // Construimos el objeto del cliente
            const ObjectCardClient = new ObjectClientCarAllData(observer.car, null, observer.picture);
            resolve(ObjectCardClient);
          } else {
            resolve(null);
          }
        }
      );
    });
  }
  GetEconomicData(_keyOperation: string): Promise<TransactionForService> {
    return new Promise((resolve, reject) => {
      this._customer.GetPaymentInfoToProvider(_keyOperation).subscribe(
        (observer: PartialObserver<any> | any): void => {
          if (observer.status) {
            const transaction = new TransactionForService(observer.transaction.payment_description,
              observer.transaction.currency, observer.transaction.amount,
              observer.transaction.create, observer.transaction.customer_key,
              observer.transaction.payment_status, observer.transaction.payment_system,
              observer.transaction.card_type, observer.transaction.client,
               observer.transaction._id, observer.transaction.dispute);
               resolve(transaction);
          } else {
            resolve(null);
          }
        }
      );
    });
  }
  // Función que se encarga de activar el servicio y notificarle al cliente
  ActivateService(providerData: NgForm) {
    if (providerData.invalid) {
      throw new Error('Form invalid');
    }
    const providerActivate = new CustomerServices(
      undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
      undefined, providerData.value.service_ref, true, 'TAKEN', providerData.value.provider
    );
    this.loading = true;
    this._customer.ActivateServiceRouting(providerActivate).subscribe(
      (routing: PartialObserver<any> | any): void => {
        if (routing.status) {
          this.loading = false;
          swal('Mensaje de Confirmación',
          'Has aceptado el servicio con éxito, te enviaremos los detalles de la ruta a tu correo electrónico',
          'success');
          this.closeModal(routing.updateTracking);
        } else {
          this.closeModal(null);
        }
      }
    );
  }
}

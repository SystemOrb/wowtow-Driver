import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../../../../services/auth/documents.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { PartialObserver } from 'rxjs';
import * as $ from 'jquery';
import swal from 'sweetalert';
import { NgForm } from '@angular/forms';
import { AllDataTow } from '../../../../models/tow_data_image.class';
import { TowDataService } from '../../../../services/vehicles/tow-data.service';
import { TowData } from '../../../../models/tow_data.class';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {
  PASSPORT_OR_DNI: boolean = false;
  LICENSE: boolean = false;
  RESIDENCE: boolean = false;
  POLICY: boolean = false;
  SELFIE: boolean = false;
  loadingDoc: boolean = false;
  loading: boolean = false;
  fileImage: File;
  TowData: TowData | any = '';
  datafilled: boolean = false;
  constructor(private _docs: DocumentsService, public _auth: AuthService,
    private _tows: TowDataService) { }
  async ngOnInit() {
    this.getAllDocsLoaded();
    const DataVehicle = await this.LoadDataTow();
    if (DataVehicle !== false) {
      this.TowData = DataVehicle.driver;
      this.datafilled = true;
    }
  }
  getAllDocsLoaded(): void {
    this._docs.getDocsByProvider(this._auth._id).subscribe(
      (observer: PartialObserver<any> | any): void => {
        // Verificamos que documentos ya ha cargado
        if (observer.status) {
          for (const doc_iterator of observer.documents) {
            this.SupportDocs(doc_iterator.documentType);
          }
        }
      }
    );
  }
  // Para verificar que documento contiene y si esta verificado
  SupportDocs(documentType: string) {
    switch (documentType) {
      case 'PASSPORT':
        this.PASSPORT_OR_DNI = true;
        break;
      case 'DNI':
        this.PASSPORT_OR_DNI = true;
        break;
      case 'LICENSE':
        this.LICENSE = true;
        break;
      case 'POLICY':
        this.POLICY = true;
        break;
      case 'SELFIE':
        this.SELFIE = true;
        break;
      case 'RESIDENCE':
        this.RESIDENCE = true;
        break;
    }
  }
  DispatchFile(reference: string): void {
    $(`#${reference}`).trigger('click');
  }
  // Funcion que verifica el tipo de archivo, peso etc
  ReadURLImageData(event: any, previewTow?: string): void {
    const target = event.target.files[0];
    this.fileImage = target;
    if (target.type === 'image/jpeg' || target.type === 'image/png'
    || target.type === 'image/jpg' || target.type === 'image/gif') {
      const size = (event.target.files[0].size);
      if (size < (1024 * 1024)) {
        const reader = new FileReader();
        reader.onload = (e: any): void => {
          $(`#${previewTow}`).attr('src', e.target.result);
          this.loadingDoc = true;
        };
        reader.readAsDataURL(event.target.files[0]);
      } else {
        swal('Error', 'The file size is very big', 'warning');
        return;
      }
    } else {
      swal('Error', 'You are sending an invalid file, please verify the extension', 'error');
      return;
    }
  }
  cancelButton(cancelPreviewOn: string): void {
    $(`#${cancelPreviewOn}`).attr('src', './assets/images/Unknown-person.gif');
    this.fileImage = null;
    this.loadingDoc = false;
  }
  /* Sending data */
  FormData(dataAvailable: NgForm): void {
    if (dataAvailable.invalid) {
      throw new Error('Failure to sending this data');
    }
    this.loading = true;
    this._docs.LoadDocByProvider(this.fileImage, dataAvailable.value._key,
       'document', `documentType=${dataAvailable.value.documentType}`).subscribe(
         (observer: PartialObserver<any> | any): void => {
           if (observer.status) {
             swal('System Message', observer.msg, 'success');
            this.SupportDocs(observer.docUploaded.documentType);
             this.loading = false;
             this.loadingDoc = false;
             this.fileImage = null;
             return;
           }
         }
       );
  }
  // Cargamos data de la grua al servidor
  async FormDataVehicle(dataAvailable: NgForm)  {
    if (dataAvailable.invalid) {
      throw new Error('Form is invalid');
    }
    const towForm = new TowData(dataAvailable.value.tow_name, dataAvailable.value.tow_plate,
      dataAvailable.value.tow_model);
      this._tows.UploadNewVehicleData(towForm, dataAvailable.value._key).subscribe(
        async (observer: PartialObserver<any> | any) => {
          if (observer.status) {
            const profile = await this.uploadProfileTow(observer.newTowCar._id, this.fileImage);
            if (profile !== false ) {
              swal('System Approbation', 'Your tow truck has been loaded successfully', 'success');
              this.datafilled = true;
              return;
            }
          }
        }
      );
  }
  // Cargamos la foto de la grua con el ID que fue creado al enviar el form
  uploadProfileTow(towId: string, image: File): Promise<any> {
    return new Promise((resolve, reject) => {
      this._tows.uploadPictureTow(image, towId).subscribe(
        (observer: PartialObserver<any> | any): void => {
          if (observer.status) {
            resolve(observer.towResp);
          } else {
            resolve(false);
          }
        }
      );
    });
  }
  // Carga la data en caso de que ya completo el formulario
  LoadDataTow(): Promise<TowData | AllDataTow | any> {
    return new Promise((resolve, reject) => {
        this._tows.loadVehicleData(this._auth._id).subscribe(
          (observer: PartialObserver<any> | any): void => {
            if (observer.status) {
              resolve(observer.dataPartial[0]);
            } else {
              resolve(false);
            }
          }
        );
    });
  }
}

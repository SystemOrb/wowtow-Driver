import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TowImageComponent } from './tow-image/tow-image.component';
import { SelfieComponent } from './selfie/selfie.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LicenseComponent } from './license/license.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PublicRoutingModule } from './public.routes';
import { AngularMaterialModule } from '../../../angular-material.module';
import { ValidationComponent } from './validation/validation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PublicRoutingModule,
    AngularMaterialModule
  ],
  declarations: [
    TowImageComponent,
    SelfieComponent,
    RegisterComponent,
    LoginComponent,
    LicenseComponent,
    ValidationComponent
  ]
})
export class PublicModule { }

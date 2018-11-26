import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LicenseComponent } from './license/license.component';
import { TowImageComponent } from './tow-image/tow-image.component';
import { SelfieComponent } from './selfie/selfie.component';


const routes: Routes = [
    {path: 'driver/login', component: LoginComponent},
    {path: 'driver/register', component: RegisterComponent},
    {path: 'driver/upload/license', component: LicenseComponent},
    {path: 'driver/upload/tow', component: TowImageComponent},
    {path: 'driver/upload/selfie', component: SelfieComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicRoutingModule {}

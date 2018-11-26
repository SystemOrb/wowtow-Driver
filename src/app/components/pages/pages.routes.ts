import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MapComponent } from './map/map.component';
import { ProfileComponent } from './profile/profile.component';
import { PaymentsComponent } from './payments/payments.component';
import { SearchComponent } from './search/search.component';
import { TravelComponent } from './travel/travel.component';



const routes: Routes = [
    {path: 'home', component: MapComponent},
    {path: 'profile/:driver', component: ProfileComponent},
    {path: 'payments/:driver', component: PaymentsComponent},
    {path: 'places', component: SearchComponent},
    {path: 'travels/:driver', component: TravelComponent},
    {path: '', pathMatch: 'full', redirectTo: '/home'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}

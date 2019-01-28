import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelComponent } from './travel/travel.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { PaymentsComponent } from './payments/payments.component';
import { MapComponent } from './map/map.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { PagesRoutingModule } from './pages.routes';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AgmDirectionModule } from 'agm-direction';
import { CustomerCardComponent } from './map/customer-card.component';
import { ImagesAWSPipe } from '../../services/pipes/images-aws.pipe';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB5p34zzFGSWmuv7m6Wfh8WpvY-ZJmdEfA',
      libraries: ['places', 'geometry']
    }),
    PagesRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,
    AgmDirectionModule,

  ],
  declarations: [
    TravelComponent,
    SearchComponent,
    ProfileComponent,
    PaymentsComponent,
    MapComponent,
    CustomerCardComponent,
    ImagesAWSPipe
  ],
  entryComponents: [MapComponent, CustomerCardComponent]
})
export class PagesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TogglerService } from './components/toggler.service';
import { PlacesService } from './maps/places.service';
import { AgmCoreModule } from '@agm/core';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { DocumentsService } from './auth/documents.service';
import { TowDataService } from './vehicles/tow-data.service';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB5p34zzFGSWmuv7m6Wfh8WpvY-ZJmdEfA',
      libraries: ['places', 'geometry']
    }),
    HttpClientModule
  ],
  declarations: [],
  providers: [
    TogglerService,
    PlacesService,
    AuthService,
    DocumentsService,
    TowDataService
  ]
})
export class ServicesModule { }

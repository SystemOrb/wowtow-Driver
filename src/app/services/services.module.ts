import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TogglerService } from './components/toggler.service';
import { PlacesService } from './maps/places.service';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB5p34zzFGSWmuv7m6Wfh8WpvY-ZJmdEfA',
      libraries: ['places', 'geometry']
    }),
  ],
  declarations: [],
  providers: [
    TogglerService,
    PlacesService
  ]
})
export class ServicesModule { }

import { Injectable, ElementRef, Output, EventEmitter, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Coords } from '../../models/coords.class';
@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  @Output() CheckDestiny: EventEmitter<Coords> = new EventEmitter();
  constructor(private places: MapsAPILoader, private ngZone: NgZone) { }
  public destiny: Coords = {
    lat: 0,
    lng: 0
  };
  loadPlaces(route: ElementRef): boolean {
    this.places.load().then((): void => {
      const Intellisence = new google.maps.places.Autocomplete(route.nativeElement, {
        types: ['geocode']
      });
      Intellisence.addListener('place_changed', async () => {
        this.ngZone.run((): void => {
          const place: google.maps.places.PlaceResult = Intellisence.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            this.CheckDestiny.emit(null);
            return;
          }
          this.destiny.lat = place.geometry.location.lat();
          this.destiny.lng = place.geometry.location.lng();
          const newDestiny = new Coords(this.destiny.lat, this.destiny.lng);
          this.CheckDestiny.emit(newDestiny);
        });
      });
    });
  }
}

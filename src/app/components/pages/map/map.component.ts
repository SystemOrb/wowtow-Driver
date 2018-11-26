import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit, Renderer } from '@angular/core';
import { TogglerService } from '../../../services/components/toggler.service';
import { Router } from '@angular/router';
import { MAP_TEMPLE } from '../../../enviroments/map.temple';
import { PlacesService } from '../../../services/maps/places.service';
import { Coords } from '../../../models/coords.class';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  public title: string = 'My first AGM project';
  public lat: number = 51.678418;
  public lng: number = 7.809007;
  @ViewChild('AgmMap') agmMap: any;
  @ViewChild('wrapper') wrapper: ElementRef;
  private centerLat: number;
  private centerLng: number;
  public zoom: number = 10;
  private changeLat: number;
  private changeLng: number;
  public displayButtonToggler: boolean = true;
  public MapStyles = MAP_TEMPLE;
  public destiny: Coords;
  public markerOptions = {
    origin: {
        icon: './assets/images/map/map-marker-8.png',
        draggable: false,
        opacity: 1
    },
    destination: {
        icon: './assets/images/arrow.png',
        opacity: 1,
        dragabble: false
    },
};
  public origin: Coords | any = '';
  public renderOption = {
    suppressMarkers: true,
  };
  constructor(private renderer: Renderer, private _toggler: TogglerService,
    private _router: Router, private _places: PlacesService) { }
  async ngOnInit() {
    this.destiny = this._places.destiny;
    const MyPosition = await this.getPosition();
    if (MyPosition) {
      this.origin = new Coords(MyPosition.coords.latitude, MyPosition.coords.longitude);
      this.zoom = 12;
    } else {
      this.origin = new Coords(51.678418, 7.809007);
      this.zoom = 10;
    }
  }
  @HostListener('window:resize')
  onWindowResize() {
    this.onResize();
  }

  ngAfterViewInit() {
    this.renderer.setElementStyle(
      this.wrapper.nativeElement, 'height',
      (window.innerHeight) + 'px'
    );
  }

  onResize() {
    // resize the container for the google map
    this.renderer.setElementStyle(
      this.wrapper.nativeElement, 'height',
      (window.innerHeight ) + 'px'
    );

    // recenters the map to the resized area.
    this.agmMap.triggerResize().then(() =>
       this.agmMap._mapsWrapper.setCenter({lat: this.centerLat, lng: this.centerLng}));
  }

  idle() {
    this.centerLat = this.changeLat;
    this.centerLng = this.changeLng;
  }

  centerChange(event: any) {
    if (event) {
      this.changeLat = event.lat;
      this.changeLng = event.lng;
    }
  }
  toggleSidebar() {
    if (this._toggler.displaySidebar) {
      this._toggler.displaySidebar = false;
      this.displayButtonToggler = true;
      return;
    } else {
      this._toggler.displaySidebar = true;
      this.displayButtonToggler = false;
      return;
    }
  }
  search() {
      this._router.navigate(['/places']);
  }
  private getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(position);
        });
      } else {
        resolve(false);
      }
    });
  }
}

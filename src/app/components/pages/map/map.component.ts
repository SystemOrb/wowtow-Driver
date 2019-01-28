import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit, Renderer } from '@angular/core';
import { TogglerService } from '../../../services/components/toggler.service';
import { Router } from '@angular/router';
import { MAP_TEMPLE } from '../../../enviroments/map.temple';
import { PlacesService } from '../../../services/maps/places.service';
import { Coords } from '../../../models/coords.class';
import { ClientServicesService } from '../../../services/maps/client-services.service';
import { CustomerServices } from 'src/app/models/services.class';
import { AuthService } from '../../../services/auth/auth.service';
import { PartialObserver } from 'rxjs';
import { MatDialog } from '@angular/material';
import { CustomerCardComponent } from './customer-card.component';
import { InfoWindow } from '@agm/core/services/google-maps-types';

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
  // Marcadores de los servicios de los clientes
  ServicesMarketOption = {
    url: './assets/markers/2x/baseline-gps.png',
    scaledSize: {
        width: 36,
        height: 36
    }
};
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
  public Markers: CustomerServices[] | any = [];
  constructor(private renderer: Renderer, private _toggler: TogglerService,
    private _router: Router, private _places: PlacesService, public _services: ClientServicesService,
    private _auth: AuthService, public cardCustomer: MatDialog) { }
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
    // Verificamos si tomamos ya servicios de algun cliente y aun no lo hemos finalizado
    // Para mostrarlo en el mapa
    setTimeout(async ()  => {
      const OnRout = await this.OnRoutingCurse(this._auth._id);
      if (OnRout !== null) {
        // Es un arreglo de servicios asi que lo recorremos y vamos insertandolo en el mapa
        for (const marker of OnRout) {
          this._services.ServiceCoordsInProcess.push({
            origin: {
              lat: Number(marker.fromLng),
              lng: Number(marker.fromLat)
            },
            destiny: {
              lat: Number(marker.toLat),
              lng: Number(marker.toLng)
            }
          });
        }
        this._services.renderMarkers = {
          origin: {
            icon: './assets/markers/2x/driver.png',
            draggable: false,
            opacity: 1
          },
          destination: {
            icon: './assets/markers/2x/destination.png',
            draggable: false,
            opacity: 1
          }
        };
        this._services.ServiceInProcess = true;
      }
    }, 1000);
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
  // El gruero se activa para trabajar asi que el sistema trae los servicios más cercanos a su localización
  TouchApp(): Promise<CustomerServices | boolean> {
    return new Promise((resolve, reject) => {
      if (this._services.working) {
        this._services.working = false; // Si pulsa el boton nuevamente desactivamos el servicio
        return;
      }
      this._services.GetAvailableServicesByCity(this._auth.clientDriverObject.city).subscribe(
        (observer: PartialObserver<any> | any): void => {
          if (observer.status) {
            this._services.working = true;
            resolve(observer.NewMatrix);
            return;
          }
          resolve(false);
        }
      );
    });
  }
  // Pinta los servicios en el mapa
  async MarkersServices() {
    const markers = await this.TouchApp();
    if (!markers) {
      return;
    }
    this.Markers = markers;
    console.log(this.Markers);
  }
  /*
  Para mostrar una tarjeta con los datos del cliente
  */
 OpenCardCustomer(service_id: string, customerKey: string, payment_ref: string,
  fromLat: number, fromLng: number, toLng: number, toLat: number): void {
  const dialogRef = this.cardCustomer.open(CustomerCardComponent, {
      width: '600px',
      height: '400px',
      data: {
        service_id,
        customerKey,
        payment_ref,
        fromLat, fromLng, toLng, toLat
      }
    });
    dialogRef.afterClosed().subscribe(
      (observer: PartialObserver<any> | any): void => {
        this._services.ServiceInProcess = true;
        this._services.ServiceCoordsInProcess.push({
          origin: {
            lat: Number(observer.fromLng),
            lng: Number(observer.fromLat)
          },
          destiny: {
            lat: Number(observer.toLat),
            lng: Number(observer.toLng)
          }
        });
        this._services.renderMarkers = {
          origin: {
            icon: './assets/markers/2x/driver.png',
            draggable: false,
            opacity: 1
          },
          destination: {
            icon: './assets/markers/2x/destination.png',
            draggable: false,
            opacity: 1
          }
        };
    });
 }
 // Metodo que carga las rutas en proceso tomadas por el gruero
 OnRoutingCurse(towDriver: string): Promise<CustomerServices[]> {
   return new Promise((resolve, reject) => {
     this._services.ServicesOnCurse(towDriver).subscribe(
       (onRouting: PartialObserver<any> | any): void => {
         if (onRouting.status) {
           resolve(onRouting.routing);
           return;
         } else {
           resolve(null);
         }
       }
     );
   });
 }
 // Tarjeta del gruero
 InfoProvider(window: InfoWindow): void {
 }
}

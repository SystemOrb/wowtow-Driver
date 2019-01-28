import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlacesService } from '../../../services/maps/places.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('zone') public driverZone: ElementRef;
  constructor(private _places: PlacesService, private _router: Router) { }

  ngOnInit() {
  }
  LoadPlaces() {
    this._places.loadPlaces(this.driverZone);
    this._places.CheckDestiny.subscribe(
      (event: any): void => {
        if (event !== null) {
          setTimeout((): void => {
            this._router.navigate(['/']);
          }, 500);
        }
      }
    );
  }
}

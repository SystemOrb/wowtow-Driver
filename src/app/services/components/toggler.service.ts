import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TogglerService {
  public displaySidebar: boolean = false;
  constructor() {
   }
}

import { Component, OnInit } from '@angular/core';
import { TogglerService } from '../../services/components/toggler.service';
declare function init_plugins();
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {

  constructor(public _sidebar: TogglerService) { }

  ngOnInit() {
    init_plugins();
  }

}

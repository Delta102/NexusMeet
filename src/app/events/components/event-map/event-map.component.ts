import { Component, Input, OnInit } from '@angular/core';
import { MapService } from './maps.service';

@Component({
  selector: 'event-map',
  templateUrl: './event-map.component.html',
  styles: [
  ]
})
export class EventMapComponent {
  @Input()
  latitude!: number;
  @Input()
  longitude!: number;

  constructor(private map: MapService) { }

  ngOnInit() {
    this.map.buildMap(this.longitude, this.latitude);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { EventData } from '../../interfaces/event-data.interface';

@Component({
  selector: 'shared-event-card-image',
  templateUrl: './event-card-image.component.html',
  styles: [
  ]
})
export class EventCardImageComponent{
  @Input()
  public event!: EventData;

  // imageUrl = `http://127.0.0.1:8000/${this.event.eventImage}`;

  imageUrl = 'https://media.es.wired.com/photos/6528556477d0abfe94832fc6/4:3/w_1536,h_1152,c_limit/Dragon%20Ball%20Daima.jpeg';

  tipear(): void{
    console.log('Botón Presionado');

  }
}

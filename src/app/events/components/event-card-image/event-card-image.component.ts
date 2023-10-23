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

  public hasLoaded: boolean = false;

  onLoad(){
    setTimeout(() =>{
        this.hasLoaded = true;
      },200);
  }
}

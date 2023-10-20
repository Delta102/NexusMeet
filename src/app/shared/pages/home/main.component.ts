import { Component, OnInit } from '@angular/core';

import { EventService } from 'src/app/events/services/event.service';
import { EventData } from 'src/app/events/interfaces/event-data.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main.component.html'
})

export class MainComponent implements OnInit{

  constructor( private eventService: EventService){};

  ngOnInit(): void {
    this.eventService.getEvents();
  }

  get eventList(): EventData[]{
    return this.eventService.eventList;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventData } from 'src/app/events/interfaces/event-data.interface';
import { EventService } from 'src/app/events/services/event.service';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styles: [
  ]
})
export class DetailEventComponent implements OnInit{

  eventId!: number;
  event!: EventData;

  constructor(private route: ActivatedRoute, private eventService: EventService){
    this.route.params.subscribe(params => {
      this.eventId = params['eventId'];
    },);
  }

  ngOnInit(): void {
    console.log(this.eventId);
    this.eventService.getEvent(this.eventId);
    this.eventService.getEvent(this.eventId).subscribe((data: EventData) => {
      this.event = data;
    });
  }


}

import { Component } from '@angular/core';
import { EventService } from 'src/app/events/services/event.service';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent {
  constructor(private eventService: EventService){ }


}

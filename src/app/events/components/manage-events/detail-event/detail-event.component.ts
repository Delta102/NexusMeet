import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styles: [
  ]
})
export class DetailEventComponent {

  eventId!: number;

  constructor(private route: ActivatedRoute){
    this.route.params.subscribe(params => {
      this.eventId = params['eventId'];
    })
  };

}

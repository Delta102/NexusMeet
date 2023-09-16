import { Component, Input } from '@angular/core';
import { EventData } from '../../interfaces/event-data.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input()
  public eventsList: EventData[] = [];
}

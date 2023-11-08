import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EntryResponse } from 'src/app/entry/interfaces/entry-response.interface';
import { EventService } from 'src/app/events/services/event.service';
import { UserService } from 'src/app/users/services/user.service';
import { EventData } from '../../../../events/interfaces/event-data.interface';

@Component({
  selector: 'app-entry-by-user',
  templateUrl: './entry-by-user.component.html',
  styles: [],
})
export class EntryByUserComponent {
  entryData!: EntryResponse[];
  eventData: EventData[] = [];

  userId: number = 0;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
    this.eventData = [];
    this.route.params.subscribe((params: Params) => {
      this.userId = params['userId'];
    });

    this.userService.getEntrysByUser(this.userId).subscribe(
      (response: any) => {
        this.entryData = response;
        console.log('Entradas', this.entryData);

      },
      (error) => {
        console.log('Error al obtener las entradas', error);
      }
    );
  }
}

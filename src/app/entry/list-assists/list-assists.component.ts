import { Component, OnInit } from '@angular/core';
import { EntryService } from '../services/entry.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { EventData } from 'src/app/events/interfaces/event-data.interface';

@Component({
  selector: 'list-assists',
  templateUrl: './list-assists.component.html',
  styles: [],
  providers: [DatePipe]
})
export class ListAssistsComponent implements OnInit{ 
  userId = 0;
  eventData: any;


  constructor(private entryService: EntryService, private route: ActivatedRoute, private datePipe: DatePipe){};


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      console.log('User Id:', this.userId);

      this.entryService.getListAssistant(this.userId).subscribe(
        (response: EventData[]) => {
          this.eventData = response;
          console.log('Eventos:');
          
          console.log(this.eventData);
          
        },
        (error) => {
          console.log('Error obteniendo las asistencias', error);
        }
      );

    });
  }

}

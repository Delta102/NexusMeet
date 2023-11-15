import { Component, Input, OnInit } from '@angular/core';
import { EntryService } from '../services/entry.service';
import { ModalCommunicationService } from 'src/app/events/services/visualservices/modal-comunication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css']
})
export class AssistantComponent implements OnInit{
  eventId: number = 0;
  usernames: string[] = [];
  errorMessage: string = '';

  constructor(private entryService: EntryService, public modalService: ModalCommunicationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventId = params['eventId'];
      console.log('Evento Id:', this.eventId);

      this.entryService.getAssistant(this.eventId).subscribe(
        (response) => {
          this.usernames = response.usernames;
          this.errorMessage = '';
        },
        (error) => {
          console.log('Error obteniendo asistentes', error);
          this.errorMessage = 'Error al obtener asistentes.';
          this.usernames = [];
        }
      );

    });
  }

  closeModal() {
    this.modalService.closeAssistantEventModal();
  }
}

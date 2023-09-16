import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { EventData } from '../../interfaces/event-data.interface';
import { ModalCommunicationService } from '../../services/visualservices/modal-comunication.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main.component.html'
})

export class MainComponent {

  constructor(
    private eventService: EventService,
    public modalService: ModalCommunicationService
  ) { }

  events: EventData[] = [];

  async ngOnInit(): Promise<void> {
    try {
      this.events = await this.eventService.getEvents();
    } catch (error) {
      console.error('Error al obtener eventos:', error);
    }
  }

  openModal() {
    this.modalService.openModal();
  }
}

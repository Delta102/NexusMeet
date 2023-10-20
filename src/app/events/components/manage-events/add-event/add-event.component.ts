import { Component, Input } from '@angular/core';
import { ModalCommunicationService } from '../../../services/visualservices/modal-comunication.service';
import { EventData } from '../../../interfaces/event-data.interface';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'add-event',
  templateUrl: './add-event.component.html',
})
export class AddEventComponent {
  @Input() userId!: number;
  constructor(public modalService: ModalCommunicationService, private eventService: EventService) {}



  closeModal() {
    this.modalService.closeRegisterEventModal(); // Cierra el modal
  }

  eventData: EventData = {
    id: 0,
    dateEventStart: new Date(''),
    eventName: '',
    eventImage: '',
    description: '',
    capacity: 0,
    entryPrice: 0,
    userId: 0,
    latitude: 0,
    longitude: 0,
    entryType: ''
  };

  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log('Archivo seleccionado:', file); // Verifica si el archivo se selecciona correctamente
    this.eventData.eventImage = file;
  }

  onSubmit() {
    console.log('Datos a enviar:', this.eventData);
    const formData = new FormData();

    const formattedDate = this.eventData.dateEventStart.toString();

    formData.append('date_event_start', formattedDate);
    formData.append('event_name', this.eventData.eventName);
    formData.append('event_image', this.eventData.eventImage);
    formData.append('description', this.eventData.description);
    formData.append('capacity', this.eventData.capacity.toString()); // Convierte a cadena
    formData.append('entry_price', this.eventData.entryPrice.toString()); // Convierte a cadena
    formData.append('creator', this.userId.toString()); // Convierte a cadena

    console.log('asdf'+formData);


    this.eventService.addEvent(formData).subscribe((response: any) => {
      // Manejar la respuesta de la API aquí (por ejemplo, mostrar un mensaje de éxito)
      console.log('Evento creado con éxito', response);
    });
  }
}

import { Component, Input } from '@angular/core';
import { ModalCommunicationService } from '../../../services/visualservices/modal-comunication.service';
import { EventData } from '../../../interfaces/event-data.interface';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  @Input() userId!: number;
  constructor(public modalService: ModalCommunicationService, private eventService: EventService) {}



  closeModal() {
    this.modalService.closeRegisterEventModal(); // Cierra el modal
  }

  eventData: EventData = {
    id: 0,
    date_event_start: new Date(''),
    event_name: '',
    name_event_image: '',
    event_image: '', // Cambiado a null para manejarlo como archivo
    description: '', // Agregado
    protocols: '', // Agregado
    capacity: 0,
    entry_price: 0,
    user_id: 0
  };

  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log('Archivo seleccionado:', file); // Verifica si el archivo se selecciona correctamente
    this.eventData.event_image = file;
  }

  onSubmit() {
    console.log('Datos a enviar:', this.eventData);
    const formData = new FormData();

    const formattedDate = this.eventData.date_event_start.toString();

    formData.append('date_event_start', formattedDate);
    formData.append('event_name', this.eventData.event_name);
    formData.append('name_event_image', this.eventData.name_event_image);
    formData.append('event_image', this.eventData.event_image);
    formData.append('description', this.eventData.description);
    formData.append('protocols', this.eventData.protocols);
    formData.append('capacity', this.eventData.capacity.toString()); // Convierte a cadena
    formData.append('entry_price', this.eventData.entry_price.toString()); // Convierte a cadena
    formData.append('creator', this.userId.toString()); // Convierte a cadena

    console.log('asdf'+formData);


    this.eventService.addEvent(formData).subscribe((response: any) => {
      // Manejar la respuesta de la API aquí (por ejemplo, mostrar un mensaje de éxito)
      console.log('Evento creado con éxito', response);
    });
  }
}

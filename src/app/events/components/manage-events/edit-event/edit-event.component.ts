import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/events/services/event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent {

  // eventId: number;
  // eventData: any = {};

  // constructor(
  //   private route: ActivatedRoute,
  //   private eventService: EventService
  // ) { }

  // ngOnInit(): void {
  //   //this.eventId = +this.route.snapshot.paramMap.get('eventId'); // Obtén el ID del evento de la ruta

  //   // Llama al servicio para obtener los datos del evento actual
  //   this.eventService.getEvent(this.eventId).subscribe((data) => {
  //     this.eventData = data;
  //   });
  // }

  // submitForm(): void {
  //   // Llama al servicio para enviar la solicitud de actualización
  //   this.eventService.updateEvent(this.eventId, this.eventData).subscribe(() => {
  //     // Actualización exitosa, puedes redirigir a la página de detalles del evento u otras acciones necesarias
  //   });
  // }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventData } from 'src/app/events/interfaces/event-data.interface';
import { EventService } from 'src/app/events/services/event.service';
import { ModalCommunicationService } from 'src/app/events/services/visualservices/modal-comunication.service';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styles: [
  ]
})
export class DetailEventComponent implements OnInit{

  eventId!: number;
  message: string = '';
  showButton: boolean = true;
  event!: EventData;
  showShop: boolean = false;

  constructor(private route: ActivatedRoute, private eventService: EventService, public modalService: ModalCommunicationService){
    this.route.params.subscribe(params => {
      this.eventId = params['eventId'];
    },);
  }

  ngOnInit(): void {
    this.showShop = false;
    this.eventService.getEvent(this.eventId).subscribe((data: EventData) => {
      this.event = data;
      if( this.event.capacity <= 0){
        this.message = 'Ya no hay entradas disponibles para este evento!!';
        this.showButton = false;
      }
      else{
        this.message = this.event.capacity.toString();
      }
    });
  }

  openBuyModal() {
    this.modalService.openBuyModal();
  }

  // Cierra el modal de Iniciar Sesión
  closeBuyModal() {
    this.modalService.closeBuyModal();
  }
}

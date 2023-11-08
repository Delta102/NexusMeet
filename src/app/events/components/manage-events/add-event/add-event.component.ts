import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ModalCommunicationService } from '../../../services/visualservices/modal-comunication.service';
import { EventData } from '../../../interfaces/event-data.interface';
import { EventService } from '../../../services/event.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments';

@Component({
  selector: 'add-event',
  templateUrl: './add-event.component.html',
})
export class AddEventComponent  implements OnInit{
  @Input() userId!: number;

  mapbox = (mapboxgl as typeof mapboxgl);

  selectedLocation: { latitude: number, longitude: number } = { latitude: 0, longitude: 0 };

  constructor(public modalService: ModalCommunicationService, private eventService: EventService) {}

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

  ngOnInit() {
    if (this.mapbox && this.selectedLocation)
      this.initMap();
  }

  closeModal() {
    this.modalService.closeRegisterEventModal();
  }

  initMap() {
    this.mapbox.accessToken = environment.mapBoxToken;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-78.5002700, -7.1637800],
      zoom: 12
    });

    // Agrega un control de navegación (opcional)
    map.addControl(new mapboxgl.NavigationControl());

    let marker: any = null;

    map.on('click', (e) => {

      const lngLat = e.lngLat;


      if(marker){
        marker.setLngLat(lngLat);
      }else{
        marker = new mapboxgl.Marker()
          .setLngLat(lngLat)
          .addTo(map);
      }

      this.eventData.latitude = lngLat.lat;
      this.eventData.longitude = lngLat.lng;
    });
  }




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
    formData.append('capacity', this.eventData.capacity.toString());
    formData.append('entry_price', this.eventData.entryPrice.toString());
    formData.append('entry_type', this.eventData.entryType.toString());
    formData.append('latitude', this.eventData.latitude.toString());
    formData.append('longitude', this.eventData.longitude.toString());
    // formData.append('entry_type', this.eventData.entryType.toString());
    formData.append('entry_type', 'General');
    formData.append('creator', this.userId.toString());


    this.eventService.addEvent(formData).subscribe((response: any) => {
      // Manejar la respuesta de la API aquí (por ejemplo, mostrar un mensaje de éxito)
      console.log('Evento creado con éxito', response);
    });
  }
}

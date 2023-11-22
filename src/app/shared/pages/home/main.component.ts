import { Component, OnInit } from '@angular/core';

import { EventService } from 'src/app/events/services/event.service';
import { EventData } from 'src/app/events/interfaces/event-data.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main.component.html'
})

export class MainComponent implements OnInit{

  constructor( private eventService: EventService){};

  imageOne = 'https://img.freepik.com/fotos-premium/operador-camara-video-trabajando-su-equipo-evento-interior_44344-333.jpg?w=1060';
  // imageTwo = 'https://img.freepik.com/foto-gratis/salon-banquetes-decorado-mesa-redonda-servida-centro-mesa-hortensias-sillas-chiavari_8353-10059.jpg?w=996&t=st=1662586503~exp=1662587103~hmac=370e6bd8eb5009deede78fe2c488dcb326d8bc36f4ea119076470c47a9173916';
  imageTree = 'https://img.freepik.com/fotos-premium/gente-feliz-baila-concierto-fiesta-discoteca_31965-6829.jpg?w=1060';

  ngOnInit(): void {
    this.eventService.getEvents();
  }

  get eventList(): EventData[]{
    return this.eventService.eventList;
  }
}

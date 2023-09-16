import { Injectable } from '@angular/core';
import { EventData } from '../interfaces/event-data.interface';
import { EventDataSource } from '../datasources/event.datasource';
import { apiConfig } from 'src/app/config/api-config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = apiConfig.apiUrl;

  constructor(
    private eventsDataSource: EventDataSource,
    private http: HttpClient // Inyecta HttpClient aquí
  ) {}

  async getEvents(): Promise<EventData[]> {
    return await this.eventsDataSource.getEventos();
  }

  addEvent(formData: FormData) {
    return this.http.post(this.apiUrl + 'events/create/', formData);
  }
}

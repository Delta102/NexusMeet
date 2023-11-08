import { Injectable } from '@angular/core';
import { EventData } from '../interfaces/event-data.interface';
import { EventDataSource } from '../datasources/event.datasource';
import { apiConfig } from 'src/app/config/api-config';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = apiConfig.apiUrl;
  public eventList: EventData[] = [];

  constructor(
    private eventsDataSource: EventDataSource,
    private http: HttpClient
  ) {
  }

  getEvents(): void {
    this.http.get<EventData[]>(`${ this.apiUrl }events/`)
      .pipe(
        map((resp: any[]) => resp.map(item => {

          return {
            id: item.id,
            dateEventStart: new Date(item.date_event_start),
            eventName: item.event_name,
            eventImage: item.event_image,
            description: item.description,
            latitude: item.latitude,
            longitude: item.longitude,
            capacity: item.capacity,
            entryPrice: item.entry_price,
            entryType: item.entry_type,
            userId: item.userId
          };
        }))
      )
      .subscribe((dataMapped: EventData[]) => {
        this.eventList = dataMapped;
      })
  }

  getEvent(eventId: number): Observable<EventData> {
    return this.http.get(`${this.apiUrl}event/${eventId}`).pipe(
      map((data: any) => {
        return {
          id: data.id,
          dateEventStart: new Date(data.date_event_start),
          eventName: data.event_name,
          eventImage: data.event_image,
          description: data.description,
          latitude: data.latitude,
          longitude: data.longitude,
          capacity: data.capacity,
          entryPrice: data.entry_price,
          entryType: data.entry_type,
          userId: data.user_id
        } as EventData;
      })
    );
  }

  getEventsByUser(userId: number): Observable<EventData[]> {
    return this.http.get<any[]>(`${this.apiUrl}events-by-user/${userId}`).pipe(
      map(response => {
        return response.map(event => {
          return {
            id: event.id,
            dateEventStart: new Date(event.date_event_start),
            eventName: event.event_name,
            eventImage: event.event_image,
            description: event.description,
            latitude: event.latitude,
            longitude: event.longitude,
            capacity: event.capacity,
            entryPrice: event.entry_price,
            entryType: event.entry_type,
            userId: event.user_id
          };
        });
      })
    );
  }

  addEvent(formData: FormData) {

    console.log(formData);


    const token = localStorage.getItem('tokenJWT');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })

    return this.http.post(this.apiUrl + 'events/create/', formData, { headers });
  }

  deleteEvent(eventId: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}delete-events/${eventId}`);
  }

  updateEvent(eventId: number, eventData: any): Observable<any> {
    const url = `${this.apiUrl}update_events/${eventId}/`;

    return this.http.put(url, eventData);
  }


}

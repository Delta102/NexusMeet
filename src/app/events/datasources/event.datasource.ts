import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiConfig } from 'src/app/config/api-config';
import { EventData } from '../interfaces/event-data.interface';

@Injectable({
  providedIn: 'root'
})
export class EventDataSource {
  private apiUrl = apiConfig.apiUrl; // Reemplaza esto con la URL de tu API

  constructor(private http: HttpClient) {}

  // Método para obtener eventos desde la API
  async getEventos(): Promise<EventData[]> {
    try {
      const data = await this.http.get<EventData[]>(this.apiUrl+'events/').toPromise();
      return data!; // Devuelve un array vacío si data es undefined
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      return []; // Devuelve un array vacío en caso de error
    }
  }
}

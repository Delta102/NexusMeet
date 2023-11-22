import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfig } from 'src/app/config/api-config';
import { EventData } from 'src/app/events/interfaces/event-data.interface';
interface AssistantResponse {
  usernames: string[];
}

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private apiUrl = apiConfig.apiUrl;

  constructor(private http: HttpClient) { }

  addEntry(formData: FormData) {
    console.log(formData);

    return this.http.post(this.apiUrl + 'entrys/create/', formData);
  }

  getAssistant(eventId: number): Observable<AssistantResponse> {
    return this.http.get<AssistantResponse>(`${this.apiUrl}get-assitants/${eventId}`);
  }

  getListAssistant(userId: number): Observable<EventData[]> {
    return this.http.get<EventData[]>(`${this.apiUrl}get-assists-by-user/${userId}`); 
  }

  sendScannedValue(value: string) {
    const data = { scannedValue: value };
    return this.http.post(this.apiUrl + 'qrvalue/', data);
  }
}

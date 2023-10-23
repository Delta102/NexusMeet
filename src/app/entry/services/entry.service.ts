import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiConfig } from 'src/app/config/api-config';

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
}

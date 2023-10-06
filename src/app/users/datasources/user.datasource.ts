import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiConfig } from 'src/app/config/api-config';
import { UserData } from '../interfaces/user-data.interface';

@Injectable({
  providedIn: 'root'
})
export class UserDataSource {
  private apiUrl = apiConfig.apiUrl; // Reemplaza esto con la URL de tu API

  constructor(private http: HttpClient) {}

  async getUser(userId: number): Promise<UserData> {
    try {
      const data = await this.http.get<UserData>(`${this.apiUrl}get-user/${userId}`).toPromise();
      return data!;
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      throw error; // Reenvía el error para que se maneje en el componente
    }
  }
}

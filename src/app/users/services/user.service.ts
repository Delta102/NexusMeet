import { Injectable } from '@angular/core';
import { apiConfig } from 'src/app/config/api-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { UserData } from '../interfaces/user-data.interface';
import { UserDataSource } from '../datasources/user.datasource';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = apiConfig.apiUrl;

  constructor(
    private http: HttpClient,
    private usersDataSource: UserDataSource
  ) {}

  addUser(userData: any) {
    return this.http.post(this.apiUrl + 'create-user/', userData);
  }

  login(username: string, password: string): Observable<any> {
    const data = { username, password };
    return this.http.post<any>(`${this.apiUrl}login/`, data).pipe(
      tap(response => {
        if (response && response.token) {
          console.log(response.token);
          console.log("Token Guardado");

          localStorage.setItem('tokenLogin', response.token);
        }
      }),
      catchError(error => {
        console.error('Error en la petición HTTP:', error);
        return throwError(error); // Reenvía el error para que se maneje en el componente que llama a esta función.
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}logout/`, {}).pipe(
      tap(() => {
        console.log("Logout exitoso");
        localStorage.removeItem('tokenLogin'); // Elimina el token del almacenamiento local
      }),
      catchError(error => {
        console.error('Error en la petición HTTP:', error);
        return throwError(error);
      })
    );
  }

  getCurrentUser(): Observable<any | null>{
    const token = localStorage.getItem('tokenLogin');

    if(token){
      const headers = new HttpHeaders({
        'Authorization': `Token ${token}`,
      });
      return this.http.get<any>(`${this.apiUrl}get-current-user/`, { headers });
    } else {
      console.log('Error en el token');
      return of(null);

    }
  }


  async getUser(userId: number): Promise<UserData> {
    return await this.usersDataSource.getUser(userId);
  }
}

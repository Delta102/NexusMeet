import { Injectable } from '@angular/core';
import { apiConfig } from 'src/app/config/api-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { UserData } from '../interfaces/user-data.interface';
import { UserDataSource } from '../datasources/user.datasource';
import { EntryResponse } from 'src/app/entry/interfaces/entry-response.interface';


interface DecodedToken {
  sub: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = apiConfig.apiUrl;
  private httpOptions: any;

  public token_expires!: Date;
  public token: string = '';
  public errors: any = [];
  public username!: string;

  constructor(
    private http: HttpClient,
    private usersDataSource: UserDataSource
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }

  addUser(userData: any) {
    return this.http.post(this.apiUrl + 'create-user/', userData);
  }


  login(username: string, password: string): Observable<boolean> {
    const body = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.apiUrl + 'api/token/', body, { headers }).pipe(
      tap((response: any) => {
        this.updateData( response.access );
        this.showExpiredToken( response.access );
        localStorage.setItem('tokenJWT', response.access);

      }),
      catchError((error) => {
        console.error('Error al iniciar sesión:', error);
        return of(false);
      })
    );
  }

  showExpiredToken(token: any): void {
    try {
      const decodedToken: DecodedToken = jwt_decode(token);
      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);

      console.log('Tiempo de expiración del token:', expirationDate);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  }

  public refreshToken() {
    this.http.post(this.apiUrl + 'api/token/refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      (data: any) => {

        this.updateData(data.token);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  logout() {
    const token = localStorage.getItem('tokenJWT'); // Obtén el token de acceso almacenado en localStorage

    if (token) {
      // Envía el token de acceso al servidor para invalidarlo
      this.http.post(this.apiUrl + 'logout/', { token }).subscribe(
        () => {

          localStorage.removeItem('tokenJWT');

          this.token = '';
          this.token_expires = new Date();
          this.username = '';
        },
        (error) => {
          console.error('Error al cerrar sesión:', error);
        }
      );
    } else {
      console.log('El token ha expirado');

    }
  }

  private updateData(token: string) {
    this.token = token;
    this.errors = [];

    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
    console.log(this.token_expires);
  }

  getCurrentUser(): Observable<UserData | null> {
    const token = localStorage.getItem('tokenJWT');


    if (token) {

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });


      return this.http.get<any>(`${this.apiUrl}get-current-user/`, { headers }).pipe(
        map((response: any) => {

          return {
            id: response.id,
            lastLogin: new Date(response.last_login),
            username: response.username,
            firstName: response.first_name,
            lastName: response.last_name,
            email: response.email,
            dateJoined: new Date(response.date_joined),
            userType: response.user_type,
            phoneNumber: response.phone_number,
            address: response.address,
            profilePicture: response.profile_picture,
            dateOfBirth: new Date(response.date_of_birth),
          } as UserData;
        })
      );
    } else {
      console.log('Error en el token');
      return of(null);
    }
  }

  updateUser(id: number, userData: UserData): Observable<UserData>{
    return this.http.put<UserData>( `${this.apiUrl}update-user/${id}` , userData);
  }

  async getUser(userId: number): Promise<UserData> {
    return await this.usersDataSource.getUser(userId);
  }

  getEntrysByUser(userId: number): Observable<EntryResponse[]> {
    return this.http.get<any[]>(`${this.apiUrl}entrys/get-entrys-by-user/${userId}`).pipe(
      map(response => {
        return response.map(entry => {
          return {
            id: entry.id,
            quantity: entry.quantity,
            priceTotal: entry.price_total,
            userId: entry.user_id,
            eventId: entry.event_id,
            eventName: entry.event_name,
            qr: entry.image_qr,
          };
        });
      })
    );
  }
}

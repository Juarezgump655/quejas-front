import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { token } from '../componentes/Models/token';
import { usuarioSesion, Usuario } from '../componentes/Models/usuario';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private baseURL = "https://muestras-medicas.herokuapp.com/Mi-prestamito/api/auth";
constructor(private httpClient: HttpClient) { }

iniciarSesion(sesion:usuarioSesion): Observable<token> {
  return this.httpClient.post<token>(`${this.baseURL}/authenticate`, sesion);
}
}

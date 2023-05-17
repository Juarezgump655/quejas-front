import { traerRegiones,  traerPuntosAtencion, contadorUsuarios } from './../componentes/Models/PuntosAtencion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PuntosAtencion } from '../componentes/Models/PuntosAtencion';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PuntosAtencionService {
  private baseURL = "https://muestras-medicas.herokuapp.com/Mi-prestamito/api/PuntosAtencion";
constructor(private httpClient: HttpClient) { }

guardarPuntosAtencion(puntosAtencion:PuntosAtencion): Observable<PuntosAtencion> {
  return this.httpClient.post<PuntosAtencion>(`${this.baseURL}/guardar`, puntosAtencion);
}


traerRegiones(): Observable<traerRegiones[]> {
  const cachedDataRegiones = localStorage.getItem('cacheRegiones');
  if (cachedDataRegiones) {
    const parsedData = JSON.parse(cachedDataRegiones) as traerRegiones[];
    console.log("Se obtuvo de la caché");
    return of(parsedData);
  }

  return this.httpClient.get<traerRegiones[]>(`${this.baseURL}/traerRegiones`).pipe(
    tap(data => {
      console.log(data);
      localStorage.setItem('cacheRegiones', JSON.stringify(data));
    })
  );
}

borrarCacheRegiones() {
  localStorage.removeItem('cacheRegiones');
}

traerPuntos(idRegion:Number):Observable<traerPuntosAtencion[]>{
  return this.httpClient.get<traerPuntosAtencion[]>(`${this.baseURL}/traerTabla/${idRegion}`);
}

modificarPunto(idPuntoAtencion: number, puntoModificado:PuntosAtencion):Observable<PuntosAtencion>{
  return this.httpClient.put<PuntosAtencion>(`${this.baseURL}/modificarpunto/${idPuntoAtencion}`, puntoModificado);
}

contadorUsuarios(idPuntoAtencion: number):Observable<contadorUsuarios>{
  return this.httpClient.get<contadorUsuarios>(`${this.baseURL}/contadorUsuarios/${idPuntoAtencion}`);
}


}

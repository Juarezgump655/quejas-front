import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoQuejaList, contadorSiglas, tipoQueja } from '../componentes/Models/TIpoQueja';

@Injectable({
    providedIn: 'root'
  })
export class TipoQuejaService {

    private baseURL = "https://muestras-medicas.herokuapp.com/Mi-prestamito/api/tipoQueja";
    constructor(private httpClient: HttpClient) { }

    guardarTipoQueja(TipoQueja: tipoQueja):Observable<tipoQueja>{
        return this.httpClient.post<tipoQueja>(`${this.baseURL}/guardar`, TipoQueja);
    }

    traerTipoQueja(): Observable<TipoQuejaList[]>{
        return this.httpClient.get<TipoQuejaList[]>(`${this.baseURL}/obtenerTipos`);
    }



      modificarTipoQueja(idTipoQueja: number, tipoModificado:tipoQueja):Observable<tipoQueja>{
        return this.httpClient.put<tipoQueja>(`${this.baseURL}/modificarTipoQueja/${idTipoQueja}`, tipoModificado);
      }


      contadorSiglas(siglasQueja: String):Observable<contadorSiglas>{
        return this.httpClient.get<contadorSiglas>(`${this.baseURL}/contSiglas/${siglasQueja}`);
      }

}
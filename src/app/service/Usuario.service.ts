import { contadorUsuarios } from './../componentes/Models/PuntosAtencion';
import { contUsuarios, tablaUsuario, traerCargo, traerPunto } from './../componentes/Models/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../componentes/Models/usuario';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseURL = "https://muestras-medicas.herokuapp.com/Mi-prestamito/api/Usuarios";
constructor(private httpClient: HttpClient) { }

registrarUsuario(usuariosinternos: Usuario): Observable<Usuario> {
  return this.httpClient.post<Usuario>(`${this.baseURL}/guardarUsuario`, usuariosinternos);
}

obtenerUsuarios(): Observable<Usuario[]> {
  return this.httpClient.get<Usuario[]>(`${this.baseURL}/all`);
}

tablaUsuario(): Observable<tablaUsuario[]>{
  return this.httpClient.get<tablaUsuario[]>(`${this.baseURL}/tablaUsuarios`);
}


puntos():Observable<traerPunto[]>{
  return this.httpClient.get<traerPunto[]>(`${this.baseURL}/traerPuntos`);
}
  

private cacheCargos!:traerCargo[];
cargo():Observable<traerCargo[]>{
  if(this.cacheCargos){
    console.log("se obtuvo cache de cargos");
    return of(this.cacheCargos);
  }
  const cacheTraerCargo = localStorage.getItem('cacheCargos');
  if(cacheTraerCargo){
    this.cacheCargos = JSON.parse(cacheTraerCargo);
    console.log("se obtuvo de cache");
    return of(this.cacheCargos);
  }

  return this.httpClient.get<traerCargo[]>(`${this.baseURL}/traerCargo`).pipe(
    tap(data =>{
      console.log(data);
      this.cacheCargos = data;
      localStorage.setItem('cacheCargos', JSON.stringify(this.cacheCargos));

    })
  );
}




modificarUsuario(idUsuario: number, usuarioModificado:Usuario):Observable<Usuario>{
  return this.httpClient.put<Usuario>(`${this.baseURL}/modificarUsuario/${idUsuario}`, usuarioModificado);
}


contExistenciaUsuario(dpi:String):Observable<contUsuarios>{
  return this.httpClient.get<contUsuarios>(`${this.baseURL}/contUsuario/${dpi}`);
}


}

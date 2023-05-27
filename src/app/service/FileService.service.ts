import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {
  private baseURL ="http://localhost:8080/Mi-prestamito/api/files";
 // private baseURL = "https://muestras-medicas.herokuapp.com/Mi-prestamito/api/files";
constructor(private httpClient: HttpClient) { }

uploadFile(file: File,correlativo:string): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('files', file);
  return this.httpClient.post<any>(`${this.baseURL}/upload/${correlativo}`, formData);
}


getFiles(): Observable<any> {
  return this.httpClient.get<any>(`${this.baseURL}/files`);
}


descargarArchivo(filename: string): Observable<Blob> {
  const url = `${this.baseURL}/${filename}`;

  return this.httpClient.get(url, { responseType: 'blob' }).pipe(
    catchError((error) => {
      console.log('Error al descargar el archivo:', error);
      return throwError(error);
    })
  );
}




}

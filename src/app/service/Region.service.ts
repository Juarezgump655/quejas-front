import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Region } from '../componentes/Models/Region';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
    private baseURL = "https://muestras-medicas.herokuapp.com/Mi-prestamito/api/Region";
constructor(private httpClient: HttpClient) { }

getRegionList(): Observable<Region[]> {
  return this.httpClient.get<Region[]>(`${this.baseURL}/all`);
}


}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {


  constructor() {}

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}

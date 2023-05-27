import { Injectable } from '@angular/core';
const USER_TOKEN = 'auth-token';
const USER_NAME = 'auth-user';
const USER_ROL = 'auth-rol';
const USER_PTA = 'auth-pta';
@Injectable({
  providedIn: 'root'
})

export class TokenService {

constructor() { }


public setToken(token: string): void {
  window.sessionStorage.removeItem(USER_TOKEN);
  window.sessionStorage.setItem(USER_TOKEN, token);
}

public getToken(): string {
  return sessionStorage.getItem(USER_TOKEN)!;
}


public setUserName(username: string): void {
  window.sessionStorage.removeItem(USER_NAME);
  window.sessionStorage.setItem(USER_NAME, username);
}



public setRol(rol: string): void {
  window.sessionStorage.removeItem(USER_ROL);
  window.sessionStorage.setItem(USER_ROL, rol);
}

public getRol(): string {
  return sessionStorage.getItem(USER_ROL)!;
}
public getUserName(): string {
  return sessionStorage.getItem(USER_NAME)!;
}

public setPuntoAtencion(puntoAtencion: string): void {
  window.sessionStorage.removeItem(USER_PTA);
  window.sessionStorage.setItem(USER_PTA, puntoAtencion);
}

public getPuntoAtencion(): string {
  return sessionStorage.getItem(USER_PTA)!;
}


public logOut(): void {
  window.sessionStorage.clear();
}


}

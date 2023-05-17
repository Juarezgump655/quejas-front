import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SesionService } from 'src/app/service/sesion.service';
import { TokenService } from 'src/app/service/token.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private tokenServicio:TokenService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenServicio.getToken();

    if(token){
      const tokenRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
    });
    return next.handle(tokenRequest);
  }
    return next.handle(request);
  }
}

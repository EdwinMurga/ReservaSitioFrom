import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    if(this.authService.estaLogueado()){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
          // "Ocp-Apim-Subscription-Key":environment.subscriptionkey
        },
      });
    }else{
      request = request.clone({
        setHeaders: {

          // "Ocp-Apim-Subscription-Key":environment.subscriptionkey
        },
      });

    }
    return next.handle(request);
  }
}

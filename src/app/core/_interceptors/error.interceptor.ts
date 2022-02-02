
import 'rxjs/add/operator/do';
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpEvent, HttpResponse, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

const swal = require('sweetalert');

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          swal('Validación', 'No tiene acceso para visualizar el recurso solicitado ó su sesión ha expirado. Por favor vuelva a iniciar sesión.', 'info')
          this.router.navigate(['login']);
        }
      }
    });
  }
}
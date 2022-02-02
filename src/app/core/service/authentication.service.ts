import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    usuarioLogeado: any;
    menu: any = [];

    constructor(private http: HttpClient) { }

    public get(collection: string): Observable<any> {
        const url =
            environment.ENDPOINTS.API_URL +
            collection;

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

        return this.http.get<any[]>(url, httpOptions).pipe(
            tap((data: any) => {

            }),
            catchError(err => {
                throw 'Error in source. Details: ' + err;
            }),
        );
    }

    public postLogin(req: any, collection: string): Observable<any> {
        const jsonrequest = JSON.stringify(req);
        const url =
            environment.ENDPOINTS.API_URL +
            collection;

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

        return this.http.post<any>(url, jsonrequest, httpOptions).pipe(
            tap((data: any) => {

            }), catchError(err => {
                throw 'Error in source. Details: ' + err;
            }),
        );
    }

    public post(req: any, collection: string): Observable<any> {
        const jsonrequest = JSON.stringify(req);
        const url =
            environment.ENDPOINTS.API_URL +
            collection;

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

        return this.http.post<any>(url, jsonrequest, httpOptions).pipe(
            tap((data: any) => {

            }),
            catchError(err => {
                throw 'Error in source. Details: ' + err;
            }),
        );
    }

    estaLogueado(): boolean {
        let result: boolean = false;
        this.usuarioLogeado = JSON.parse(localStorage.getItem('user') || '[]');
        if (this.usuarioLogeado.length == 0) {
            result = false;
        } else {
            // this.menu = usuario.objModel.menu;
            result = true;
        }
        return result;
    }
}
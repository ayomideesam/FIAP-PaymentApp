/**
 *
 * Created By Arokoyu Olalekan Ojo <olalekan.arokoyu@upperlink.ng> @ 30/05/2018
 *
 */
import {Injectable} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

@Injectable()
export class RestfulHttpService {
  token: string;
  options: any;
  headersSet: any = {};
  constructor(private http: HttpClient) {
    // this.token  = env.TOKEN;
  }

  /**
   *
   */
  createAuthorizationHeader() {
    // console.log('Token Auth ', sessionStorage.getItem(this.token), 'token 2 ', this.token);
    if (sessionStorage.getItem(this.token)) {
      const token: string = JSON.parse(sessionStorage.getItem(this.token));
      this.headersSet = new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      });
    } else {
      this.headersSet = new HttpHeaders({
        'Content-Type':  'application/json'
      });
    }
  }

  private errorHandler(error:HttpErrorResponse) {
    return throwError(error);
  }

  public get(endpoint: string, parameters?: HttpParams): Observable<any> {
    // console.info('HEADER::', this.headersSet);
    this.createAuthorizationHeader();

    if (parameters) {
      this.options = { params: parameters, headers: this.headersSet };
    } else {
      this.options = { headers: this.headersSet };
    }
    return this.http.get(endpoint, this.options).pipe(catchError(this.errorHandler));
  }


  public post(endpoint: string, data: any): Observable<any> {
    this.createAuthorizationHeader();
    return this.http.post(endpoint, data, {  headers: this.headersSet }).pipe(catchError(this.errorHandler));
  }



  public delete(endpoint: string , data: any): Observable<any> {
    this.createAuthorizationHeader();
    const params = new HttpParams(data);
    return this.http.delete(endpoint, {headers: this.headersSet, params}).pipe(catchError(this.errorHandler));
  }


  public put(endpoint: string, data: any): Observable<any> {
    this.createAuthorizationHeader();
    return this.http.put(endpoint, data, {  headers: this.headersSet }).pipe(catchError(this.errorHandler));
  }

  public patch(endpoint: string, data: any): Observable<any> {
    this.createAuthorizationHeader();
    return this.http.patch(endpoint, data, {  headers: this.headersSet }).pipe(catchError(this.errorHandler));
  }
}

import { Injectable } from '@angular/core';
import { RestfulHttpService } from './../httpService/service.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/observable/throw';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import { environment as env } from '../../../environments/environment';
// import {retryWhen} from "rxjs-compat/operator/retryWhen";
import { retryWhen, delay, mergeMap, take, catchError, map } from 'rxjs/operators';

// /${env.API_VERSION}

@Injectable({
  providedIn: 'root',
})
export class ApiService extends RestfulHttpService {
  constructor(http: HttpClient) {
    super(http);
  }

  // intercept and format all possible http error.
  private errorHandler(error: any) {
    try {
      if (error.error.code === 401 && (error.error.description.includes('Token timeout')
          || error.error.description.includes('Access denied') || error.error.description.includes('Unauthenticated'))) {
        sessionStorage.clear();
        localStorage.clear();
        return throwError(error.error || { msg: 'Unknown error occurred' });
      }
      return throwError(error || { msg: 'Unknown error occurred' });
    } catch (error) {
      return throwError(error || { msg: 'Unknown error occurred' });
    }
  }

  // in case of Login: this will art as an interceptor to store the token return and possible login user data
  private decode(res: any, auth?: string | null) {
    const data = res.data;
    if (res && res.data) {
      if (auth && auth.match('login')) {
        // sessionStorage.setItem(env.TOKEN, JSON.stringify(data.accessToken));
        sessionStorage.setItem(env.TOKEN, JSON.stringify(data.accessToken));
        sessionStorage.setItem(env.USERTOKEN, JSON.stringify(data.user));
        sessionStorage.setItem(env.TOKEN_DATE, JSON.stringify(data.tokenExpiry));
        sessionStorage.setItem(env.DATE_NOW, JSON.stringify(new Date().toISOString()));
      }
      return res;
    } else {
      return res;
    }
  }

  // handles all delete api request
  public deleteRequest(api: string, path: string, data?: any): Observable<any> {
    let ENDPOINT = `${env.API_URL}/${api}`;
    if (path) {
      ENDPOINT = `${env.API_URL}/${api}/${path}`;
    }
    return super
      .delete(ENDPOINT, data)
      .pipe(
        retryWhen((errors) => {
          return errors.pipe(
            mergeMap((err) => this.errorHandler(err)),
            delay(1000),
            take(2)
          );
        })
      )
      .pipe(
        catchError(this.errorHandler),
        map((res) => {
          return res;
        })
      );
  }

  // handles all update api request
  public putRequest(api: string, path: string, data: any): Observable<any> {
    let ENDPOINT = `${env.API_URL}/${api}`;
    if (path) {
      ENDPOINT = `${env.API_URL}/${api}/${path}`;
    }
    return super
      .put(ENDPOINT, data)
      .pipe(
        retryWhen((errors) => {
          return errors.pipe(
            mergeMap((err) => this.errorHandler(err)),
            delay(1000),
            take(2)
          );
        })
      )
      .pipe(
        catchError(this.errorHandler),
        map((res) => {
          return res;
        })
      );
  }

  // handles all patching api request
  public patchRequest(api: string, path: string | null, data: any): Observable<any> {
    let ENDPOINT = `${env.API_URL}/${api}`;
    if (path) {
      ENDPOINT = `${env.API_URL}/${api}/${path}`;
    }
    return super
      .patch(ENDPOINT, data)
      .pipe(
        retryWhen((errors) => {
          return errors.pipe(
            mergeMap((err) => this.errorHandler(err)),
            delay(1000),
            take(2)
          );
        })
      )
      .pipe(
        catchError(this.errorHandler),
        map((res) => {
          return res;
        })
      );
  }
  // handles all get / list api request
  public getRequest(api: string, path?: string | null, params?: HttpParams): Observable<any> {
    let ENDPOINT = `${env.API_URL}/${api}`;
    if (path) {
      ENDPOINT = `${env.API_URL}/${api}/${path}`;
    }
    return super
      .get(ENDPOINT, params)
      .pipe(
        retryWhen((errors) => {
          return errors.pipe(
            mergeMap((err) => this.errorHandler(err)),
            delay(1000),
            take(2)
          );
        })
      )
      .pipe(
        catchError(this.errorHandler),
        map((res) => {
          return res;
        })
      );
  }

  // handles all post api request
  public postRequest(api: string, path: null | string, data: any): Observable<any> {
    let ENDPOINT = `${env.API_URL}/${api}`;
    if (path) {
      ENDPOINT = `${env.API_URL}/${api}/${path}`;
    }
    return super
      .post(ENDPOINT, data)
      .pipe(
        retryWhen((errors) => {
          return errors.pipe(
            mergeMap((err) => this.errorHandler(err)),
            delay(1000),
            take(2)
          );
        })
      )
      .pipe(
        catchError(this.errorHandler),
        map((res) => this.decode(res, path))
      );
  }
}

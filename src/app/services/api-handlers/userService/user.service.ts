/**
 * Created by Arokoyu Olalekan Ojo
 */

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IResponse} from '../../../interfaces/iresponse';
import {ApiService} from '../../api/api.service';
import { RestfulHttpService } from '../../httpService/service.service';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(private api: ApiService) {

  }
  auth(data: any): Observable<IResponse> {
    return this.api.postRequest('authenticate', 'login' , data).map((res: IResponse)  => {
      return res ;
    });
  }
  logout(): Observable<IResponse> {
    return this.api.getRequest('user', 'logout').pipe(
      map((res: IResponse) => {return res;
      })
    );
  }
  forgotPassword(data: any): Observable<IResponse> {
    return this.api.postRequest('user', 'forgetpassword' , data).pipe(
      map((res: IResponse) => {
        return res;
      })
    );
  }
  resetPassword(data: any): Observable<IResponse> {
    return this.api.postRequest('forgot-password', 'reset' , data).pipe(
      map((res: IResponse) => {
        return res;
      })
    );
  }
  changePassword(data: any): Observable<IResponse> {
    return this.api.postRequest('change-password', null , data).pipe(
      map((res: IResponse) => {
        return res;
      })
    );
  }
  updateUserPassword(data: any): Observable<IResponse> {
    return this.api.postRequest('user', 'updatepassword' , data).pipe(
      map((res: IResponse) => {
        return res;
      })
    );
  }
  changeUserPassword(data: any): Observable<IResponse> {
    return this.api.putRequest('user', 'changepassword' , data).pipe(
      map((res: IResponse) => {
        return res;
      })
    );
  }
  updateUser(data: any): Observable<IResponse> {
    return this.api.postRequest('user', '' , data).pipe(
      map((res: IResponse) => {
        return res;
      })
    );
  }
  unlockUser(data: any): Observable<IResponse> {
    return this.api.postRequest('user', 'unlock' , data).pipe(
      map((res: IResponse) => {
        return res;
      })
    );
  }
  getClientTypes(): Observable<IResponse> {
    return this.api.getRequest('users', '').pipe( map((res: any) => {
        return res;
      })
    );
  }
  getUsers(): Observable<IResponse> {
    return this.api.getRequest('users', '').pipe( map((res: any) => {
        return res;
      })
    );
  }

  getUserByID(id: number): Observable<IResponse> {
    return this.api.getRequest('user', '' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  toggleUsers(data: object) {
    return this.api.putRequest('user', 'approvereject', data).pipe(
      map((res: any) => {
        console.log('update_approval', res);
        return res;
      })
    );
  }

  getAuditLog(): Observable<IResponse> {
    return this.api.getRequest('auditlog', 'paging').pipe( map((res: any) => {
        return res;
      })
    );
  }
  getBanks(): Observable<IResponse> {
    return this.api.getRequest('banks', '').pipe( map((res: any) => {
        return res;
      })
    );
  }
  getClients(): Observable<IResponse> {
    return this.api.getRequest('admin', 'client').pipe(
      map((res: IResponse) => {
        return res;
      })
    );
  }
  createClientType(data: object): Observable<IResponse> {
    return this.api.postRequest('admin', 'client_type', data).pipe(
      map((res: IResponse) => {
        return res;
      })
    );
  }
  createClient(data: object): Observable<IResponse> {
    return this.api.postRequest('user', '', data).pipe(
      map((res: any) => {
        console.log('CreateNewClient', res);
        return res;
      })
    );
  }
  createBank(data: object): Observable<IResponse> {
    return this.api.postRequest('bank', '', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateClientType(data: object, id: string): Observable<IResponse> {
    return this.api.putRequest('user', 'approvereject', data).pipe(
      map((res: any) => {
        console.log('update aprroval', res);
        return res;
      })
    );
  }
  /*updateClientType(data: object, id: string): Observable<IResponse> {
    return this.api.putRequest('admin', 'client_type/' + id, data).pipe(
      map((res: IResponse) => {
        return res;
      })
    );
  }*/
  updateClient(data: object, id: string): Observable<IResponse> {
    return this.api.putRequest('user', '', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  updateBank(data: object, id: string): Observable<IResponse> {
    return this.api.putRequest('bank', '', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  deleteClientType(id: string): Observable<IResponse> {
    return this.api.deleteRequest('admin', 'client_type/' + id).pipe(
      map((res: IResponse) => {
        return res;
      })
    );
  }
  deleteClient(id: string): Observable<IResponse> {
    return this.api.deleteRequest('admin', 'client/' + id).pipe(
      map((res: IResponse) => {
        return res;
      })
    );
  }
}

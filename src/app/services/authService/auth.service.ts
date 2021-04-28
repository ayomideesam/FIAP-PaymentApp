/**
 *
 * Created By Arokoyu Olalekan Ojo <arokoyuolalekan@gmail.com> @ 8/9/2019
 *
 */
import {Injectable} from '@angular/core';
import {CacheService} from '../cacheService/cache.service';
import { environment as ENV } from '../../../environments/environment';
import {UserService} from '../api-handlers/userService/user.service';

@Injectable()
export class AuthService {
  constructor(private cacheService: CacheService, private userService: UserService) {
  }

  public getUserToken() {
    return this.cacheService.getSession(ENV.TOKEN);
  }
  public getUserDetails() {
    return this.cacheService.getSession(ENV.USERTOKEN);
  }
  public getUserID() {
    return this.cacheService.getSession(ENV.USERID);
  }
  public getAllUserDetails() {
    return this.cacheService.getStorage(ENV.USERCOUNT);
  }
  public getAuditCount() {
    return this.cacheService.getStorage(ENV.AUDITCOUNT);
  }
  public getBankCount() {
    return this.cacheService.getStorage(ENV.BANKCOUNT);
  }
  public getUserRole() {
    return this.cacheService.getSession(ENV.ROLE);
  }
  public checkLogin(): boolean {
    const token =  this.cacheService.getSession(ENV.TOKEN);
    // console.log('Login Token', token);
    const user =  this.cacheService.getSession(ENV.USERTOKEN);
    const recentDate =  this.cacheService.getStorage(ENV.DATE_NOW);
    const expireDate =  this.cacheService.getSession(ENV.TOKENEXPIRYCOUNT);
    /*const role =  this.cacheService.getSession(ENV.ROLE);
    if (!token || !user || !role) {
      return false;
    } else if (new Date(createdDate) > new Date(expiredDate)) {
      return false;
    } else {
      return true;
    }*/
    if (!token || !user) {
      return false;
    } else if (new Date(recentDate) > new Date(expireDate)) {
      return false;
    } else {
      return true;
    }
  }

  public logOut() {
    this.signOut();
    this.cacheService.clearSession();
    this.cacheService.clearStorage();
    return true;
  }
  private signOut() {
    this.userService.logout().subscribe();
  }
}

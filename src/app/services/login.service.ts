import { Injectable } from '@angular/core';
import {environment as ENV} from "../../environments/environment";
import {BootstrapNotifyService} from "./bootstrap-notify/bootstrap-notify.service";
import {UserService} from "./api-handlers/userService/user.service";
import {NavigatorService} from "./navigatorService/navigator.service";
import {CacheService} from "./cacheService/cache.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private cacheService: CacheService, private userService: UserService, private navigatorService: NavigatorService, private bootstrapService: BootstrapNotifyService) { }

  public async loginProcess(credentials, successCB = null, errCB = null) {
    this.userService.auth(credentials).subscribe((res: any) => {
      // this.loading = false;
      console.log(credentials);
      // console.log("tokenExpiry-Time", res.tokenExpiry);
      this.cacheService.setStorage(ENV.TOKENEXPIRYCOUNT, res.tokenTime);
      this.cacheService.setSession(ENV.TOKENEXPIRYCOUNT, res.tokenTime);
      this.cacheService.setStorage(ENV.USERID, res.id);
      this.bootstrapService.success('Authentication successful!');
      if(successCB) {
        successCB();
      }
      this.navigatorService.navigateUrl('/admin/dashboard');
    },error => {
      // this.loading = false;
      console.info('Login Error', error);
      if(errCB) {
        errCB();
      }
      this.bootstrapService.error(error.error.description, error.error.code);
      // this.bootstrapService.error(error.msg || 'Invalid login details!');
    });
  }}

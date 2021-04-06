import { Component, OnInit } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
import {NavigatorService} from '../../services/navigatorService/navigator.service';
import {UserService} from '../../services/api-handlers/userService/user.service';
import {BootstrapNotifyService} from '../../services/bootstrap-notify/bootstrap-notify.service';
import {UtilService} from '../../services/utilService/util.service';
import {IResponse} from '../../interfaces/iresponse';
import {CacheService} from '../../services/cacheService/cache.service';
declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public credentials = {
    email: null,
    password: null
  };
  public loading = false;
  public EMAIL_VALIDATION =  ENV.EMAIL_VALIDATION;
  constructor(private userService: UserService, private navigatorService: NavigatorService,
              private cacheService: CacheService,
              private bootstrapService: BootstrapNotifyService, private utilService: UtilService) {}

  ngOnInit() {
    this.utilService.setFullPageBackgroundImage();
  }
   public loginProcess() {
     /* if (!this.credentials.email || !this.credentials.password) {
       return this.bootstrapService.error('Email and password is required!');
     } else if (!this.credentials.email.match(this.EMAIL_VALIDATION)) {
       return this.bootstrapService.error('Invalid email address!');
     } else {
       this.loading = true;
       /*this.userService.auth(this.credentials).subscribe((response: IResponse) => {
         this.loading = false;
         console.log(this.credentials);
         this.bootstrapService.success('Authentication successful!');
         const loginType = response.data.user.login_type.split('App\\Models\\')[1];
         this.cacheService.setSession(ENV.ROLE, loginType.toLowerCase());
         if (loginType.toLowerCase() === 'admin') {
           this.navigatorService.navigateUrl('/admin/dashboard');
         } else {
           this.navigatorService.navigateUrl('/client/manage-documents');
         }
       }, */
      this.userService.auth(this.credentials).subscribe((res: any) => {
          this.loading = false;
          console.log(this.credentials);
          console.log("token", res);
          this.bootstrapService.success('Authentication successful!');
          this.navigatorService.navigateUrl('/admin/dashboard');
        },error => {
        this.loading = false;
        console.info('Error after login ', error);
        this.bootstrapService.error(error.error.description, error.error.code);
        // this.bootstrapService.error(error.msg || 'Invalid login details!');
      });
    }
  }
// }


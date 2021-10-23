import { Component, OnInit } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
import {NavigatorService} from '../../services/navigatorService/navigator.service';
import {UserService} from '../../services/api-handlers/userService/user.service';
import {BootstrapNotifyService} from '../../services/bootstrap-notify/bootstrap-notify.service';
import {UtilService} from '../../services/utilService/util.service';
import {IResponse} from '../../interfaces/iresponse';
import {CacheService} from '../../services/cacheService/cache.service';
import {LoginService} from "../../services/login.service";
declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fieldTextType: boolean;
  public credentials = {
    email: null,
    password: null
  };
  public loading = false;
  public EMAIL_VALIDATION =  ENV.EMAIL_VALIDATION;
  constructor(private userService: UserService, private navigatorService: NavigatorService,
              private cacheService: CacheService,
              private bootstrapService: BootstrapNotifyService, private utilService: UtilService, private loginService: LoginService) {}

  ngOnInit() {
    this.utilService.setFullPageBackgroundImage();
  }
   public async loginProcess() {
     this.loading = true;
     await this.loginService.loginProcess(this.credentials);
     this.loading = false;

   }
  public toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  }

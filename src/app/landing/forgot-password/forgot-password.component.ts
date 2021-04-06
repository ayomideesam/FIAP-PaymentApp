import { Component, OnInit } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
import {NavigatorService} from '../../services/navigatorService/navigator.service';
import {IResponse} from '../../interfaces/iresponse';
import {BootstrapNotifyService} from '../../services/bootstrap-notify/bootstrap-notify.service';
import {UserService} from '../../services/api-handlers/userService/user.service';
import {UtilService} from "../../services/utilService/util.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public EMAIL_VALIDATION: any =  ENV.EMAIL_VALIDATION;
  public credentials = {
    email: null
  };
  public userDetails: any;
  loaders = {
    loading: false
  };
  constructor(private notificationService: BootstrapNotifyService,
              private userService: UserService,
              private utilService: UtilService,
              private navigatorService: NavigatorService) {}
  ngOnInit(): void {
    this.userDetails = null;
    this.utilService.setFullPageBackgroundImage();
  }
  public forgotPassword() {
    if (!this.credentials.email ) {
      this.notificationService.info('You have to provide email address to reset password!');
    } else if (!this.credentials.email.match(this.EMAIL_VALIDATION) ) {
      this.notificationService.info('Not a valid email address!');
    } else {
      this.loaders.loading = true;
      this.userService.forgotPassword(this.credentials).subscribe((response: IResponse) => {
        console.log('Response - email', response);
        this.loaders.loading = false;
        this.notificationService.success('Password reset link sent to you at ' + this.credentials.email);
        this.navigatorService.navigateUrl('/');
      }, error => {
        // this.notificationService.error(error.error.message || 'Unable to reset password');
        this.notificationService.error(error.error.description, error.error.code);
        this.loaders.loading = false;
        console.info('Reset Error => ', error);
      });
    }
  }
}

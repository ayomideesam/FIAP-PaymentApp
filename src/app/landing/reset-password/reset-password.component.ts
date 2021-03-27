import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/api-handlers/userService/user.service';
import {NavigatorService} from '../../services/navigatorService/navigator.service';
import {CacheService} from '../../services/cacheService/cache.service';
import {IResponse} from '../../interfaces/iresponse';
import {BootstrapNotifyService} from '../../services/bootstrap-notify/bootstrap-notify.service';
import {UtilService} from '../../services/utilService/util.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public credentials = {
    password_confirmation: null,
    password: null,
    token: null,
  };
  loaders = {
    loading: false
  };
  constructor(private bootstrapNotify: BootstrapNotifyService,
              private userService: UserService,
              private navigatorService: NavigatorService,
              private route: ActivatedRoute,
              private utilService: UtilService) {
  }
  ngOnInit(): void {
    this.credentials.token = this.route.snapshot.paramMap.get('token');
    this.utilService.setFullPageBackgroundImage();
  }

  public resetPassword() {
    if (!this.credentials.password_confirmation || !this.credentials.password) {
      this.bootstrapNotify.info('Provide new password!');
    } else if (this.credentials.password_confirmation === this.credentials.password) {
      this.bootstrapNotify.info('The two password must match!');
    } else {
            this.loaders.loading = true;
            this.userService.resetPassword(this.credentials).subscribe((response: IResponse) => {
              console.log('Response', response);
              this.loaders.loading = false;
              this.bootstrapNotify.success(response.message || 'Please proceed to login');
              this.navigatorService.navigateUrl('/');
            }, error => {
              this.bootstrapNotify.error(error.error.message || 'Unable to reset password');
              this.loaders.loading = false;
              console.info('Error => ', error);
            });
    }
  }
}

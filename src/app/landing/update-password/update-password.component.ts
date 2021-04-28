import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/api-handlers/userService/user.service';
import {NavigatorService} from '../../services/navigatorService/navigator.service';
import {CacheService} from '../../services/cacheService/cache.service';
import {IResponse} from '../../interfaces/iresponse';
import {BootstrapNotifyService} from '../../services/bootstrap-notify/bootstrap-notify.service';
import {UtilService} from '../../services/utilService/util.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  public credentials = {
    email: null,
    activationCode: null,
    password: null
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
    this.credentials.email = this.route.snapshot.paramMap.get('email');
    this.credentials.activationCode = this.route.snapshot.paramMap.get('activationCode');
    this.utilService.setFullPageBackgroundImage();
  }

  public updateUserPassword() {
    if (!this.credentials.password) {
      this.bootstrapNotify.info('Provide new password!');
    } else {
      this.loaders.loading = true;
      this.userService.updateUserPassword(this.credentials).subscribe((response: any) => {
        console.log('Set_Password_Response', response);
        this.loaders.loading = false;
        this.bootstrapNotify.success(response.description, response.code);
        this.navigatorService.navigateUrl('/');
      }, error => {
        this.bootstrapNotify.error(error.error.description, error.error.code);
        this.loaders.loading = false;
        console.info('Set_Password_Error => ', error);
      });
    }
  }
}

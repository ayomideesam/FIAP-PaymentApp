import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../services/login.service";
import {AuthService} from "../../../services/authService/auth.service";
import {BootstrapNotifyService} from "../../../services/bootstrap-notify/bootstrap-notify.service";
import {CacheService} from "../../../services/cacheService/cache.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reconfirm-password',
  templateUrl: './reconfirm-password.component.html',
  styleUrls: ['./reconfirm-password.component.css']
})
export class ReconfirmPasswordComponent implements OnInit {
  loading = false;
  credentials = {
    email: null,
    password: null
  };
  public currentUser: any;

  constructor(private loginService: LoginService, private authService: AuthService, private bootstrapService: BootstrapNotifyService, private cacheService: CacheService, private router: Router) { }

  ngOnInit(): void {
    const user = this.authService.getUserDetails();
    this.currentUser = this.authService.getUserDetails();
    console.log('popup', user);
    this.credentials.email = user.email;
  }

  public async loginProcess() {
    if(!this.credentials.password){
      return this.bootstrapService.error(
        "Password is required!"
      );
    } else if(!this.credentials.email) {
      this.bootstrapService.error("Email not found!");
      this.cacheService.clearSession();
      this.cacheService.clearStorage();
      this.router.navigate(["/"]);
    } else {
      this.cacheService.clearSession();
      this.cacheService.clearStorage();
      this.loading = true;
      await this.loginService.loginProcess(this.credentials, () => {
        document.getElementById("overlay").style.display = "none";
      }, () => {
        // do nothing
      });
      this.loading = false;
    }
  }

}

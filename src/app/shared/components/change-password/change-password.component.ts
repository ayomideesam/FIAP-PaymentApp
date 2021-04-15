import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/authService/auth.service';
import {BootstrapNotifyService} from '../../../services/bootstrap-notify/bootstrap-notify.service';
import {IResponse} from '../../../interfaces/iresponse';
import {UserService} from '../../../services/api-handlers/userService/user.service';
import {EventsService} from "../../../services/eventServices/event.service";
declare const $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public passwordCredential = {
    email: null,
    oldPassword: null,
    password: null,
  };
  public loading = false;
  public currentUser;
  constructor(private authService: AuthService, private bootstrapNotifyService: BootstrapNotifyService,
              private userService: UserService, private eventService: EventsService) { }

  ngOnInit() {
    this.eventService.broadcast('BREADCRUMB', 'Change Password');
    this.currentUser = this.authService.getUserDetails();
    // this.passwordCredential.userId = this.currentUser.id;
  }
  public updatePassword() {
    console.log('Pass ', this.passwordCredential);
    if (!this.passwordCredential.email) {
      this.bootstrapNotifyService.error('Enter Email Address!');
    } else if (!this.passwordCredential.oldPassword) {
      this.bootstrapNotifyService.error('Enter Old Password!');
    } else if (!this.passwordCredential.password) {
      this.bootstrapNotifyService.error('Enter New Password!');
    } else if (this.passwordCredential.password.length < 8) {
      this.bootstrapNotifyService.error('New password length too short!');
    } else {
      this.loading = true;
      this.userService.changeUserPassword(this.passwordCredential).subscribe((res: any) => {
        console.log('Password Update', res);
        this.loading = false;
        this.resetForm();
        this.bootstrapNotifyService.success(res.description, res.code);
        this.authService.logOut();
      }, error => {
        console.log('Error ', error);
        this.loading = false;
        this.bootstrapNotifyService.error(error.error.description, error.error.code);
      });
    }
  }
  private resetForm() {
    this.passwordCredential = {
      email: null,
      oldPassword: null,
      password: null,
    };
  }
}

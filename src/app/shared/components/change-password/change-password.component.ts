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
    old_password: null,
    new_password: null,
    confirm_password: null,
    userId: null
  };
  public loading = false;
  public currentUser;
  constructor(private authService: AuthService, private bootstrapNotifyService: BootstrapNotifyService,
              private userService: UserService, private eventService: EventsService) { }

  ngOnInit() {
    this.eventService.broadcast('BREADCRUMB', 'Change Password');
    this.currentUser = this.authService.getUserDetails();
    this.passwordCredential.userId = this.currentUser.id;
  }
  public updatePassword() {
    console.log('Pass ', this.passwordCredential);
    if (!this.passwordCredential.old_password) {
      this.bootstrapNotifyService.error('Enter previous password!');
    } else if (!this.passwordCredential.new_password) {
      this.bootstrapNotifyService.error('Enter new password!');
    } else if (!this.passwordCredential.confirm_password) {
      this.bootstrapNotifyService.error('Confirm new password!');
    } else if (this.passwordCredential.confirm_password !== this.passwordCredential.new_password) {
      this.bootstrapNotifyService.error('New password must match confirm password!');
    } else if (this.passwordCredential.new_password.length < 7) {
      this.bootstrapNotifyService.error('New password length too short!');
    } else {
      this.loading = true;
      this.userService.changePassword(this.passwordCredential).subscribe((res: IResponse) => {
        console.log('Password Update ', res);
        this.loading = false;
        this.resetForm();
        this.bootstrapNotifyService.success('Password changed successfully');
        this.authService.logOut();
      }, error => {
        console.log('Error ', error);
        this.loading = false;
        this.bootstrapNotifyService.error(error.error.message || 'Unable to update password');
      });
    }
  }
  private resetForm() {
    this.passwordCredential = {
      old_password: null,
      new_password: null,
      confirm_password: null,
      userId: this.currentUser.id
    };
  }
}

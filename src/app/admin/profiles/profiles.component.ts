import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../services/eventServices/event.service';
import {UserService} from '../../services/api-handlers/userService/user.service';
import {BootstrapNotifyService} from '../../services/bootstrap-notify/bootstrap-notify.service';
import {UtilService} from '../../services/utilService/util.service';
import {ActivatedRoute, Router} from "@angular/router";
import {environment as ENV} from "../../../environments/environment";
import {CacheService} from "../../services/cacheService/cache.service";
import {AuthService} from "../../services/authService/auth.service";


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  public currentUser: any;

  constructor(private eventService: EventsService, private authService: AuthService, private userService: UserService,
              private utilService: UtilService, private router: Router,
              private bootstrapNotifyService: BootstrapNotifyService, private cacheService: CacheService, private route: ActivatedRoute) {
    const token = this.cacheService.getSession(ENV.TOKEN);
    if(!token || token === '' ) {
      console.log('token is here');
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.eventService.broadcast('BREADCRUMB', 'User Profile');
    this.currentUser = this.authService.getUserDetails();
    console.log('currentUserCount', this.currentUser);
  }


}

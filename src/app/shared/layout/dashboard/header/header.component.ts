import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/authService/auth.service';
import {NavigatorService} from '../../../../services/navigatorService/navigator.service';
import {EventsService} from '../../../../services/eventServices/event.service';
import {closest} from "@angular/cdk/a11y/focus-trap/polyfill";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 public breadcrumb: string;
 public userName: any;

  constructor(private authService: AuthService, private navigatorService: NavigatorService, private eventService: EventsService) {
    this.eventService.on('BREADCRUMB', (crumb: string) => {
      this.breadcrumb = crumb;
    });
  }

  ngOnInit() {
    this.userName = this.authService.getUserDetails();
  }

  public logOutUser() {
    if (this.authService.logOut()) {
      this.navigatorService.navigateUrl('/');
    }
  }
  public toggleMiniSidebar() {
    if ($('body').hasClass('sidebar-mini')) {
      $('body').removeClass('sidebar-mini');
    } else {
      $('body').addClass('sidebar-mini');
    }
    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(() => {
      window.dispatchEvent(new Event('resize'));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(() => {
      clearInterval(simulateWindowResize);
    }, 1000);
  }

  /*$(document).ready(function(){
    $('.admin_content').on('click',function (event) {
      event.preventDefault();
      $(this).closest('.header_dropdown').find('.account_dropdown').toggle();
    });

    $(document).on('click', function (e) {
      if ($(e.target).closest('.header_dropdown').length === 0){
       $('.account_dropdown').hide();
      }
    });
  });*/
}

/* tslint:disable */

import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
declare const $: any;
import {NavigatorService} from '../../../../services/navigatorService/navigator.service';
import {AuthService} from '../../../../services/authService/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  public currentUser: any;
  public userRole: any;

  static updateActiveBar(url: string) {
   setTimeout(() => {
     let oldUrl;
     oldUrl = 'dashboard';
     $('.nav-item').removeClass('active');
     $(`#${url}`).addClass('active');
     if ($(`#${url}`).hasClass('active')) {
       oldUrl = url;
     } else {
       $(`#${oldUrl}`).addClass('active');
     }
   }, 500);
  }

  constructor(private route: Router, private navigationService: NavigatorService, private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.getUserDetails();
    console.log('CurrentUser', this.currentUser);
    this.userRole = this.authService.getUserRole();
  }
  openPage(url: string) {
    this.navigationService.navigateUrl(`/${this.userRole.toLowerCase()}/${url}`);
  }
  ngAfterViewInit() {
    this.handleUI();
  }
  private handleUI() {
    const routes = this.route.url.split('/');
    SidebarComponent.updateActiveBar(routes[routes.length - 1]);
    const element = document.querySelectorAll('.special-class');
    element.forEach((el) => {
      el.addEventListener('click', (e: any) => {
        $('.nav-item').removeClass('active');
        const id = el.id;
        if (id.includes('#') || !id) {
          // do nothing
        } else {
          $(`#${id}`).addClass('active');
        }

      });
    });
    let md = {
      misc: {
        navbar_menu_visible: 0,
        active_collapse: true,
        disabled_collapse_init: 0,
        sidebarMiniActive: false
      },

      checkSidebarImage: () => {
        // console.log('Side bar image setter');
        const sidebar = $('.sidebar');
        let imageSrc = sidebar.data('image');

        if (imageSrc !== undefined) {
          let sidebarContainer = '<div class="sidebar-background" style="background-image: url(' + imageSrc + ') "/>';
          sidebar.append(sidebarContainer);
        }
      },

    };
    // check if there is an image set for the sidebar's background
    md.checkSidebarImage();
  }
}

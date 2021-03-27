import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigatorService} from '../../services/navigatorService/navigator.service';


@Component({
  selector: 'app-user-routes',
  templateUrl: './user-routes.component.html',
  styleUrls: ['./user-routes.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserRoutesComponent implements OnInit {

  constructor(private navigatorService: NavigatorService) {
    // this.navigatorService.navigateUrl('user/dashboard');
  }

  ngOnInit() {
  }
}

import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../services/eventServices/event.service';
import {AuthService} from "../../services/authService/auth.service";
declare const $: any;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public clientCount: any;
  public auditCount: any;
  public bankCount: any;


  constructor(private eventService: EventsService, private authService: AuthService) {
  }

  ngOnInit() {
    this.clientCount = this.authService.getAllUserDetails();
    console.log('currentUserCount', this.clientCount);
    this.auditCount = this.authService.getAuditCount();
    this.bankCount = this.authService.getBankCount();
    this.eventService.broadcast('BREADCRUMB', 'Dashboard');
  }
}

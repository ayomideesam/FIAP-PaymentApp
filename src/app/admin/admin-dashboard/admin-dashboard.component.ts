import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../services/eventServices/event.service';
declare const $: any;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  constructor(private eventService: EventsService) {
  }

  ngOnInit() {
    this.eventService.broadcast('BREADCRUMB', 'Dashboard');
  }
}

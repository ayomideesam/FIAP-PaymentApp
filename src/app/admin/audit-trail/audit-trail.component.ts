import { Component, OnInit } from '@angular/core';
import {BootstrapNotifyService} from "../../services/bootstrap-notify/bootstrap-notify.service";
import {Router} from "@angular/router";
import {environment as ENV} from "../../../environments/environment";
import {UtilService} from "../../services/utilService/util.service";
import {CacheService} from "../../services/cacheService/cache.service";
import {EventsService} from "../../services/eventServices/event.service";
import {UserService} from "../../services/api-handlers/userService/user.service";

@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.css']
})
export class AuditTrailComponent implements OnInit {
  public loadingTable = false;
  public formPage = false;
  public loading = false;
  public clients: any = [];
  public client = {
    id: null,
    email: null,
    event: null,
    flag: null,
    request: null,
    status:null,
    requestTime: null
  };
  private updateMode: any;
  activeStaffId = null;
  public createdDisplay = {
    title: 'Create new client',
    btnTxt: 'Save client'
  };
  constructor(private eventService: EventsService, private userService: UserService,
              private utilService: UtilService, private router: Router,
              private bootstrapNotifyService: BootstrapNotifyService, private cacheService: CacheService) {
    const token = this.cacheService.getSession(ENV.TOKEN);
    // console.log('this is token', token);
    if(!token || token === '' ) {
      console.log('token is here');
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.eventService.broadcast('BREADCRUMB', 'Manage Audits');
    this.getAuditLog();
  }

  public getAuditLog(): void {
    this.loadingTable  = true;
    this.userService.getAuditLog().subscribe((res: any) => {
      // this.clients =  res.data.data;
      this.clients =  res.content;
      this.cacheService.setStorage(ENV.AUDITCOUNT, res.count);
      // console.log('Audit Response', res);
      this.loadingTable = false;
      this.utilService.startDatatable('showAudit');
    }, error => {
      console.log('Audit Error', error);
      this.bootstrapNotifyService.error(error.error.description, error.error.code);
      this.loadingTable = false;
    });
  }

  public resetForm() {
    this.toggleView();
    this.client = {
      id: null,
      email: null,
      event: null,
      flag: null,
      request: null,
      status:null,
      requestTime: null
    };
    this.updateMode = null;
    this.createdDisplay = {
      title: 'Create New Client',
      btnTxt: 'Save Client'
    };
  }

  public viewAuditLog(client) {
    console.log('active', client);
    this.client = this.updateMode = JSON.parse(JSON.stringify(client));
    this.activeStaffId = client.id;
    this.createdDisplay = {
      title: 'AUDIT INFORMATION FOR ID',
      btnTxt: 'Save Client'
    };
    this.toggleView();
  }

  public toggleView() {
    if ($('#viewUsers').hasClass('d-none')) {
      $('#viewUsers').removeClass('d-none');
      this.formPage = false;
    } else {
      $('#viewUsers').addClass('d-none');
      this.formPage = true;
    }
  }

}

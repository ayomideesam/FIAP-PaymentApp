import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../services/eventServices/event.service';
import {IResponse} from '../../interfaces/iresponse';
import {UserService} from '../../services/api-handlers/userService/user.service';
import {BootstrapNotifyService} from '../../services/bootstrap-notify/bootstrap-notify.service';
import {UtilService} from '../../services/utilService/util.service';
import {Router} from "@angular/router";
import {environment as ENV} from "../../../environments/environment";
import {CacheService} from "../../services/cacheService/cache.service";

@Component({
  selector: 'app-view-bank',
  templateUrl: './view-bank.component.html',
  styles: [
  ]
})
export class ViewBankComponent implements OnInit {
  public loadingTable = false;
  public newFormPage = false;
  public loading = false;
  public banks: any[] = [];
  public bank = {
    id: null,
    name: null,
    bankCode: null,
    nipCode: null,
    createdBy: null,
    creator: null
  };
  private updateMode: any;
  public createdDisplay = {
    title: 'Create New Bank',
    btnTxt: 'Save Bank'
  };
  constructor(private eventService: EventsService, private userService: UserService,
              private utilService: UtilService,
              private bootstrapNotifyService: BootstrapNotifyService) { }

  ngOnInit(): void {
    this.eventService.broadcast('BREADCRUMB', 'Manage Banks');
  }

  /*public getAuditLog(): void {
    this.loadingTable  = true;
    this.userService.getAuditLog().subscribe((res: any) => {
      // this.clients =  res.data.data;
      this.clients =  res.content;
      this.cacheService.setStorage(ENV.AUDITCOUNT, res.count);
      // console.log('User Response', res);
      this.loadingTable = false;
      this.utilService.startDatatable('showAudit');
    }, error => {
      console.log('Audit Error', error);
      this.bootstrapNotifyService.error(error.error.description, error.error.code);
      this.loadingTable = false;
    });
  }*/

  public newResetForm() {
    // this.secondToggleView();
    this.bank = {
      id: null,
      name: null,
      bankCode: null,
      nipCode: null,
      createdBy: null,
      creator: null
    };
    this.updateMode = null;
    this.createdDisplay = {
      title: 'NEW BANK INFORMATION FOR ID',
      btnTxt: 'CLOSE'
    };
  }

  public viewBank(bank) {
    console.log('activeBank', bank);
    this.bank = this.updateMode = JSON.parse(JSON.stringify(bank));
    this.createdDisplay = {
      title: 'BANK INFORMATION FOR ID',
      btnTxt: 'Save Bank'
    };
    // this.secondToggleView();
  }

  public toggleView() {
    if ($('#viewUsers').hasClass('d-none')) {
      $('#viewUsers').removeClass('d-none');
      this.newFormPage = false;
    } else {
      $('#viewUsers').addClass('d-none');
      this.newFormPage = true;
    }
  }

}

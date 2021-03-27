import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../services/eventServices/event.service';
import {UserService} from '../../services/api-handlers/userService/user.service';
import {BootstrapNotifyService} from '../../services/bootstrap-notify/bootstrap-notify.service';
import {IResponse} from '../../interfaces/iresponse';
import {UtilService} from '../../services/utilService/util.service';

@Component({
  selector: 'app-client-types',
  templateUrl: './client-types.component.html',
  styleUrls: ['./client-types.component.css']
})
export class ClientTypesComponent implements OnInit {
  public loadingTable = false;
  public loading = false;
  public clientTypes: any[] = [];
  public clientType = {
    name: null,
    description: null
  };
  private updateMode: any;
  public createdDisplay = {
    title: 'Create new client type',
    btnTxt: 'Save new'
  };
  constructor(private eventService: EventsService, private userService: UserService,
              private utilService: UtilService,
              private bootstrapNotifyService: BootstrapNotifyService) { }

  ngOnInit(): void {
    this.eventService.broadcast('BREADCRUMB', 'Client Types');
    this.getClientTypes();
  }
  public getClientTypes(): void {
    this.loadingTable  = true;
    this.userService.getClientTypes().subscribe((res: IResponse) => {
      this.clientTypes =  res.data.data;
      // this.bootstrapNotifyService.success(res.message || 'Client types fetched successfully!');
      this.loadingTable = false;
      this.utilService.startDatatable('listClientTypes');
    }, error => {
      console.log('E ', error);
      this.bootstrapNotifyService.error(error.error.message || 'Unable to get client types');
      this.loadingTable = false;
    });
  }
  public resetForm() {
    this.clientType = {
      name: null,
      description: null
    };
    this.updateMode = null;
    this.createdDisplay = {
      title: 'Create new client type',
      btnTxt: 'Save new'
    };
  }
  public editType(type: any) {
  this.resetForm();
  this.clientType = this.updateMode = JSON.parse(JSON.stringify(type));
  this.createdDisplay = {
      title: 'Update client type',
      btnTxt: 'Save update'
    };
  }
  public saveClientType() {
    if (!this.clientType.name) {
      return this.bootstrapNotifyService.info('Client type name is required!');
    } else if (this.updateMode) {
      this.updateClientType();
    } else {
      this.createClientType();
    }
  }
  private createClientType() {
    this.loading = true;
    this.userService.createClientType(this.clientType).subscribe((res) => {
      this.loading = false;
      this.resetForm();
      this.bootstrapNotifyService.success('Client type created!');
      this.getClientTypes();
    }, error => {
      this.loading =  false;
      this.bootstrapNotifyService.error(error.error.message || 'Unable to save client type!');
    });
  }
  private updateClientType() {
    this.loading = true;
    this.userService.updateClientType(this.clientType, this.updateMode.id).subscribe((res) => {
      this.loading = false;
      console.log('Res', res);
      this.bootstrapNotifyService.success('Client type updated!');
      this.resetForm();
      this.getClientTypes();
    }, error => {
      this.loading =  false;
      this.bootstrapNotifyService.error(error.error.message || 'Unable to update client type!');
    });
  }
  public deleteType(type: any) {
    this.utilService.confirmAction(() => {
      this.userService.deleteClientType(type.id).subscribe(() => {
        this.bootstrapNotifyService.success('Client type deleted!');
        this.getClientTypes();
      }, error => {
        this.bootstrapNotifyService.error(error.error.message || 'Unable to delete client type!');
      });
    });
  }

}

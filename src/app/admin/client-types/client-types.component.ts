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
    firstName: null,
    approved: null
  };
  private updateMode: any;
  public createdDisplay = {
    title: 'Update User Approvals',
    btnTxt: 'Save Update'
  };
  constructor(private eventService: EventsService, private userService: UserService,
              private utilService: UtilService,
              private bootstrapNotifyService: BootstrapNotifyService) { }

  ngOnInit(): void {
    this.eventService.broadcast('BREADCRUMB', 'User Approvals');
    this.getClientTypes();
  }
  public getClientTypes(): void {
    this.loadingTable  = true;
    this.userService.getClientTypes().subscribe((res: any) => {
      this.clientTypes =  res.content;
      this.bootstrapNotifyService.success(res.message || 'Approvals fetched successfully!');
      this.loadingTable = false;
      this.utilService.startDatatable('listClientTypes');
    }, error => {
      console.log('E ', error);
      this.bootstrapNotifyService.error(error.error.description, error.error.code);
      this.loadingTable = false;
    });
  }
  public resetForm() {
    this.clientType = {
      firstName: null,
      approved: null
    };
    this.updateMode = null;
    this.createdDisplay = {
      title: 'Update User Approvals',
      btnTxt: 'Save Update'
    };
  }
  public editType(type: any) {
    this.resetForm();
    this.clientType = this.updateMode = JSON.parse(JSON.stringify(type));
    this.createdDisplay = {
      title: 'Update User Approvals',
      btnTxt: 'Save Update'
    };
  }
  public saveClientType() {
    if (!this.clientType.firstName) {
      return this.bootstrapNotifyService.info('User First Name is required!');
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
      this.bootstrapNotifyService.error(error.error.description, error.error.code);
    });
  }
  private updateClientType() {
    this.loading = true;
    this.userService.updateClientType(this.clientType, this.updateMode.id).subscribe((res:any) => {
      this.loading = false;
      console.log('Res', res);
      this.bootstrapNotifyService.success(res.description, res.code);
      this.resetForm();
      this.getClientTypes();
    }, error => {
      this.loading =  false;
      this.bootstrapNotifyService.error(error.error.description, error.error.code);
    });
  }
  public deleteType(type: any) {
    this.utilService.confirmAction(() => {
      this.userService.deleteClientType(type.id).subscribe(() => {
        this.bootstrapNotifyService.success('Client type deleted!');
        this.getClientTypes();
      }, error => {
        this.bootstrapNotifyService.error(error.error.description, error.error.code);
      });
    });
  }

}

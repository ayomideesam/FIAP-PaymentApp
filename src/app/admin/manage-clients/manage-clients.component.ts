import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../services/eventServices/event.service';
import {IResponse} from '../../interfaces/iresponse';
import {UserService} from '../../services/api-handlers/userService/user.service';
import {BootstrapNotifyService} from '../../services/bootstrap-notify/bootstrap-notify.service';
import {UtilService} from '../../services/utilService/util.service';

@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.css']
})
export class ManageClientsComponent implements OnInit {
  public loadingTable = false;
  public formPage = false;
  public loading = false;
  public clients: any[] = [];
  public clientTypes: any[] = [];
  public client = {
    first_name: null,
    last_name: null,
    client_type_id: null,
    email: null
  };
  private updateMode: any;
  public createdDisplay = {
    title: 'Create new client',
    btnTxt: 'Save client'
  };
  constructor(private eventService: EventsService, private userService: UserService,
              private utilService: UtilService,
              private bootstrapNotifyService: BootstrapNotifyService) { }

  ngOnInit(): void {
    // this.eventService.broadcast('BREADCRUMB', 'Manage Clients');
    this.eventService.broadcast('BREADCRUMB', 'Manage Users');
    this.getClients();
    this.getClientTypes();
  }


  public getClients(): void {
    this.loadingTable  = true;
    this.userService.getClients().subscribe((res: IResponse) => {
      this.clients =  res.data.data;
      this.loadingTable = false;
      this.utilService.startDatatable('listClients');
    }, error => {
      console.log('E ', error);
      this.bootstrapNotifyService.error(error.error.message || 'Unable to get clients');
      this.loadingTable = false;
    });
  }
  public resetForm() {
    this.toggleView();
    this.client = {
      first_name: null,
      last_name: null,
      client_type_id: null,
      email: null
    };
    this.updateMode = null;
    this.createdDisplay = {
      title: 'Create new client',
      btnTxt: 'Save client'
    };
  }
  public editClient(client: any) {
    this.client = this.updateMode = JSON.parse(JSON.stringify(client));
    this.createdDisplay = {
      title: 'Update client',
      btnTxt: 'Save Client'
    };
    this.toggleView();
  }
  public viewDocuments(client: any) {}

  public saveClient() {
    if (!this.client.first_name) {
      return this.bootstrapNotifyService.info('Client first name is required!');
    } else if (!this.client.last_name) {
      return this.bootstrapNotifyService.info('Client last name is required!');
    } else if (!this.client.email) {
      return this.bootstrapNotifyService.info('Client email is required!');
    } else if (!this.client.client_type_id) {
      return this.bootstrapNotifyService.info('Client type is required!');
    } else if (this.updateMode) {
      this.updateClient();
    } else {
      this.createClient();
    }
  }
  private createClient() {
    this.loading = true;
    this.userService.createClient(this.client).subscribe((res) => {
      this.loading = false;
      this.resetForm();
      this.bootstrapNotifyService.success('Client created!');
      this.getClients();
    }, error => {
      this.loading =  false;
      this.bootstrapNotifyService.error(error.error.message || 'Unable to create client!');
    });
  }
  private updateClient() {
    this.loading = true;
    this.userService.updateClient(this.client, this.updateMode.id).subscribe((res) => {
      this.loading = false;
      console.log('Res', res);
      this.bootstrapNotifyService.success('Client updated!');
      this.resetForm();
      this.getClients();
    }, error => {
      this.loading =  false;
      this.bootstrapNotifyService.error(error.error.message || 'Unable to update client!');
    });
  }
  private getClientTypes() {
    this.userService.getClientTypes().subscribe((res: IResponse) => {
      this.clientTypes =  res.data.data;
    }, error => {
      this.bootstrapNotifyService.error(error.error.message || 'Unable to list client types');
    });
  }
  public toggleView() {
    if ($('#viewClients').hasClass('d-none')) {
      $('#viewClients').removeClass('d-none');
      this.formPage = false;
    } else {
      $('#viewClients').addClass('d-none');
      this.formPage = true;
    }
  }
}

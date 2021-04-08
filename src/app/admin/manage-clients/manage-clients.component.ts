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
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.css']
})
export class ManageClientsComponent implements OnInit {
  public loadingTable = false;
  public formPage = false;
  public loading = false;
  // public clients: any[] = [];
  public clients: any = [];
  public clientTypes: any[] = [];
  public client = {
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    address: null,
    id: null
  };
  private updateMode: any;
  public createdDisplay = {
    title: 'Create new client',
    btnTxt: 'Save client'
  };
  constructor(private eventService: EventsService, private userService: UserService,
              private utilService: UtilService, private router: Router,
              private bootstrapNotifyService: BootstrapNotifyService, private cacheService: CacheService) {
    const token = this.cacheService.getSession(ENV.TOKEN);
    console.log('this is token', token);
    if(!token || token === '' ) {
      console.log('token is here');
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // this.eventService.broadcast('BREADCRUMB', 'Manage Clients');
    this.eventService.broadcast('BREADCRUMB', 'Manage Users');
    this.getUsers();
    // this.getClients();
    // this.getClientTypes();
  }
  // public getClients(): void {
  public getUsers(): void {
    this.loadingTable  = true;
    // this.userService.getClients().subscribe((res: IResponse) => {
    this.userService.getUsers().subscribe((res: any) => {
      // this.clients =  res.data.data;
      this.clients =  res.content;
      console.log('User Response', res);
      this.loadingTable = false;
      this.utilService.startDatatable('listUsers');
    }, error => {
      console.log('User Error', error);
      this.bootstrapNotifyService.error(error.error.description, error.error.code);
      this.loadingTable = false;
    });
  }
  public resetForm() {
    this.toggleView();
    this.client = {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      address: null,
      id: null
    };
    this.updateMode = null;
    this.createdDisplay = {
      title: 'Create New Client',
      btnTxt: 'Save Client'
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
    if (!this.client.firstName) {
      return this.bootstrapNotifyService.info('Client first name is required!');
    } else if (!this.client.lastName) {
      return this.bootstrapNotifyService.info('Client last name is required!');
    } else if (!this.client.email) {
      return this.bootstrapNotifyService.info('Client email is required!');
    } else if (!this.client.phoneNumber) {
      return this.bootstrapNotifyService.info('Client phone number is required!');
    } else if (!this.client.address) {
      return this.bootstrapNotifyService.info('Client address is required!');
    } else if (!this.client.id) {
      return this.bootstrapNotifyService.info('Client id is required!');
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
      // this.getClients();
      this.getUsers();
    }, error => {
      this.loading =  false;
      this.bootstrapNotifyService.error(error.error.description, error.error.code);
    });
  }
  private updateClient() {
    this.loading = true;
    this.userService.updateClient(this.client, this.updateMode.id).subscribe((res) => {
      this.loading = false;
      console.log('Res', res);
      this.bootstrapNotifyService.success('Client updated!');
      this.resetForm();
      // this.getClients();
      this.getUsers();
    }, error => {
      this.loading =  false;
      this.bootstrapNotifyService.error(error.error.description, error.error.code);
    });
  }
  private getClientTypes() {
    this.userService.getClientTypes().subscribe((res: IResponse) => {
      this.clientTypes =  res.data.data;
    }, error => {
      this.bootstrapNotifyService.error(error.error.description, error.error.code);
    });
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

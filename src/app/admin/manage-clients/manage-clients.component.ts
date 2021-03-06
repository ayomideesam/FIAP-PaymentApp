import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../services/eventServices/event.service';
import {IResponse} from '../../interfaces/iresponse';
import {UserService} from '../../services/api-handlers/userService/user.service';
import {BootstrapNotifyService} from '../../services/bootstrap-notify/bootstrap-notify.service';
import {UtilService} from '../../services/utilService/util.service';
import {Router} from "@angular/router";
import {environment as ENV} from "../../../environments/environment";
import {CacheService} from "../../services/cacheService/cache.service";
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";

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
  public clientTypes: any = [];
  public client = {
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    address: null,
    id: null,
    status: null,
    lockedDate: null,
    passwordExpired: null,
    passwordExpirationDaysRemaining: null,
    createdBy: null,
    creator: null,
    lastUpdatedBy: null,
    approved: null
  };
  private updateMode: any;
  activeStaffId = null;
  public createdDisplay = {
    title: 'Create New User',
    btnTxt: 'Create User'
  };
  closeResult = '';
  private unlockEmail: any;
  modalReference: any;

  constructor(private eventService: EventsService, private userService: UserService,
              private utilService: UtilService, private router: Router,
              private bootstrapNotifyService: BootstrapNotifyService, private cacheService: CacheService, private modalService: NgbModal) {
    const token = this.cacheService.getSession(ENV.TOKEN);
    // console.log('this is token', token);
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
      // this.cacheService.setStorage(ENV.USERCOUNT, res.count);
      // console.log('User Response', res);
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
      id: null,
      status: null,
      lockedDate: null,
      passwordExpired: null,
      passwordExpirationDaysRemaining: null,
      createdBy: null,
      creator: null,
      lastUpdatedBy: null,
      approved: null
    };
    this.updateMode = null;
    this.createdDisplay = {
      title: 'Create New Client',
      btnTxt: 'Save Client'
    };
  }

  public editClient(client) {
    console.log('active', client);
    this.client = this.updateMode = JSON.parse(JSON.stringify(client));
    this.activeStaffId = client.id;
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
    this.userService.createClient(this.client).subscribe((res: any) => {
      this.loading = false;
      this.resetForm();
      this.bootstrapNotifyService.success(res.description, res.code);
      // this.getClients();
      this.getUsers();
    }, error => {
      this.loading =  false;
      this.bootstrapNotifyService.error(error.error.description, error.error.code);
    });
  }

  private updateClient() {
    this.loading = true;
    this.userService.updateClient(this.client, this.updateMode.id).subscribe((res: any) => {
      this.loading = false;
      console.log('Res', res);
      this.bootstrapNotifyService.success(res.description, res.code);
      this.resetForm();
      this.getUsers();
    }, error => {
      this.loading =  false;
      this.bootstrapNotifyService.error(error.error.description, error.error.code);
    });
  }
  private getClientTypes() {
    this.userService.getClientTypes().subscribe((res: any) => {
      this.clientTypes =  res.content;
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

  openDetails(targetModal, client) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('clientID').setAttribute('value', client.id);
    document.getElementById('clientFirstName').setAttribute('value', client.firstName);
    document.getElementById('clientLastName').setAttribute('value', client.lastName);
    document.getElementById('clientEmail').setAttribute('value', client.email);
    document.getElementById('clientPhoneNumber').setAttribute('value', client.phoneNumber);
    document.getElementById('clientAddress').setAttribute('value', client.address);
    document.getElementById('clientStatus').setAttribute('value', client.status);
    document.getElementById('clientLockDate').setAttribute('value', client.lockedDate);
    document.getElementById('clientCreatedBy').setAttribute('value', client.createdBy);
    document.getElementById('clientCreator').setAttribute('value', client.creator);
    document.getElementById('clientApproved').setAttribute('value', client.approved);
  }

  unlockUser(contentUnlock, client) {
    this.unlockEmail = client.email;
    this.modalReference =  this.modalService.open(contentUnlock, {
      backdrop: 'static',
      size: 'sm'
    });
  }

  unlockUserAccount() {
    this.loading = true;
    const req = {
      email: this.unlockEmail
    };
    this.userService.unlockUserAccount(req).subscribe((res: any) => {
        this.loading = false;
        this.modalReference.close();
        this.getUsers();
        if (res.code == '200') {
          return this.bootstrapNotifyService.success(res.description, res.code);
        }
        this.bootstrapNotifyService.success(res.description, res.code);
      }, error => {
        this.loading =  false;
        this.bootstrapNotifyService.error(error.error.description, error.error.code);
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

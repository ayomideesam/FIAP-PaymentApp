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
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent implements OnInit {
  public loadingTable = false;
  public formPage = false;
  public loading = false;
  // public clients: any[] = [];
  public clients: any = [];
  public client = {
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    address: null,
    id: null,
    status: null,
    loginStatus: null,
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
  closeResult: string;
  toggleButton = [
    {
      src: 'src/assets/images/toggle_on_black_24dp.svg'},
    {
      src: 'src/assets/images/toggle_off_black_24dp.svg'
    }];

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
      this.cacheService.setStorage(ENV.USERCOUNT, res.count);
      // console.log('User Response', res);
      this.loadingTable = false;
      this.utilService.startDatatable('listUsers');
    }, error => {
      console.log('User Error', error);
      this.bootstrapNotifyService.error(error.error.description, error.error.code);
      this.loadingTable = false;
    });
  }

  private toggleUsers() {
    this.loading = true;
    this.userService.toggleUsers(this.clients).subscribe((res) => {
      this.loading = false;
      console.log('Res', res);
      this.bootstrapNotifyService.success('Client type updated!');
      this.clients();
    }, error => {
      this.loading =  false;
      this.bootstrapNotifyService.error(error.error.message || 'Unable to update client type!');
    });
  }

  openDetails(targetModal, client) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('clientID').setAttribute('value', client.id);
    document.getElementById('clientApproved').setAttribute('value', client.approved == 1 ? 'APPROVED' : 'DISAPPROVED');
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

import {Component, OnInit, ViewChild} from '@angular/core';
import {EventsService} from '../../services/eventServices/event.service';
import {AuthService} from "../../services/authService/auth.service";
import {UserService} from "../../services/api-handlers/userService/user.service";
import {environment as ENV} from "../../../environments/environment";
import {BootstrapNotifyService} from "../../services/bootstrap-notify/bootstrap-notify.service";
import {CacheService} from "../../services/cacheService/cache.service";
import {DashboardService} from "../../services/dashboard.service";
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from "@angular/material/paginator";

export interface PeriodicElement {
  id: number;
  bank: string;
  amount: number;
  date: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, bank: 'FIDELITY BANK', amount: 1.0079, date: '2021-04-21'},
  {id: 2, bank: 'ACCESS BANK', amount: 4.0026, date: '2021-04-21'},
  {id: 3, bank: 'HERITAGE BANK', amount: 6.941, date: '2021-04-21'},
  {id: 4, bank: 'ZENITH BANK', amount: 9.0122, date: '2021-04-21'},
  {id: 5, bank: 'FIRST BANK', amount: 10.811, date: '2021-04-21'},
  {id: 6, bank: 'OCEANIC BANK', amount: 12.0107, date: '2021-04-21'},
  {id: 7, bank: 'STERLING BANK', amount: 14.0067, date: '2021-04-21'},
  {id: 8, bank: 'UNITED BANK OF AFRICA', amount: 15.9994, date: '2021-04-21'},
  {id: 9, bank: 'UNION BANK', amount: 18.9984, date: '2021-04-21'},
  {id: 10, bank: 'UNITY BANK', amount: 20.1797, date: '2021-04-20'},
  {id: 11, bank: 'FCMB', amount: 22.9897, date: '2021-04-20'},
  {id: 12, bank: 'KEYSTONE BANK', amount: 24.305, date: '2021-04-20'},
  {id: 13, bank: 'POLARIS BANK', amount: 26.9815, date: '2021-04-20'},
  {id: 14, bank: 'STANDARD CHARTERED', amount: 28.0855, date: '2021-04-20'},
  {id: 15, bank: 'TITAN TRUST BANK', amount: 30.9738, date: '2021-04-20'},
  {id: 16, bank: 'WEMA BANK', amount: 32.065, date: '2021-04-20'},
  {id: 17, bank: 'GUARANTY TRUST BANK', amount: 35.453, date: '2021-04-20'},
  {id: 18, bank: 'ECO BANK', amount: 39.948, date: '2021-04-20'},
  {id: 19, bank: 'CITI BANK', amount: 39.0983, date: '2021-04-20'},
  {id: 20, bank: 'STANBIC BANK', amount: 40.078, date: '2021-04-20'},
];

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
  public clients = '';
  public banks = '';
  public audits = '';

  bigChart = [];
  pieChart = [];
  displayedColumns: string[] = ['id', 'bank', 'amount', 'date'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private eventService: EventsService, private userService: UserService, private cacheService: CacheService, private bootstrapNotifyService: BootstrapNotifyService, private authService: AuthService, private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.getUsers();
    this.getBanks();
    this.getAuditLog();
    /*this.clientCount = this.authService.getAllUserDetails();
    console.log('currentUserCount', this.clientCount);
    this.auditCount = this.authService.getAuditCount();
    this.bankCount = this.authService.getBankCount();*/
    this.eventService.broadcast('BREADCRUMB', 'Dashboard');

    this.bigChart = this.dashboardService.bigChart();
    this.pieChart = this.dashboardService.pieChart();
    this.dataSource.paginator = this.paginator;
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe((res: any) => {
      // this.clients =  res.data.data;
      this.clients =  res.count;
    }, error => {
      console.log('User Error', error);
      this.bootstrapNotifyService.error(error.error.description, error.error.code);
    });
  }

  public getBanks(): void {
    this.userService.getBanks().subscribe((res: any) => {
      this.banks =  res.count;
    }, error => {
      console.log('Bank Response ', error);
      this.bootstrapNotifyService.error(error.error.description, error.error.code);
    });
  }
  public getAuditLog(): void {
    this.userService.getAuditLog().subscribe((res: any) => {
      // this.clients =  res.data.data;
      this.audits =  res.count;
    }, error => {
      console.log('Audit Error', error);
      this.bootstrapNotifyService.error(error.error.description, error.error.code);
    });
  }
}

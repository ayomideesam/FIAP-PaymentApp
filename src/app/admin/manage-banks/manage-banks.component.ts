import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../services/eventServices/event.service';
import {IResponse} from '../../interfaces/iresponse';
import {UserService} from '../../services/api-handlers/userService/user.service';
import {BootstrapNotifyService} from '../../services/bootstrap-notify/bootstrap-notify.service';
import {UtilService} from '../../services/utilService/util.service';
import {Router} from "@angular/router";
import {environment as ENV} from "../../../environments/environment";
import {CacheService} from "../../services/cacheService/cache.service";
import {ViewBankComponent} from "./view-bank.component";
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-manage-banks',
  templateUrl: './manage-banks.component.html',
  styleUrls: ['./manage-banks.component.css']
})
export class ManageBanksComponent implements OnInit {
  public loadingTable = false;
  public formPage = false;
  public newFormPage = false;
  public loading = false;
  public banks: any[] = [];
  public bank = {
    id: null,
    name: null,
    bankCode: null,
    nipCode: null,
    accountPaymentUrl: null,
    accountCallBackUrl: null,
    createdBy: null,
    creator: null
  };
  private updateMode: any;
  public createdDisplay = {
    title: 'Create New Bank',
    btnTxt: 'Save Bank'
  };
  closeResult: string;
  constructor(private eventService: EventsService, private userService: UserService,
              private utilService: UtilService,
              private bootstrapNotifyService: BootstrapNotifyService, private cacheService: CacheService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.eventService.broadcast('BREADCRUMB', 'Manage Banks');
    this.getBanks();
  }


  public getBanks(): void {
    this.loadingTable  = true;
    this.userService.getBanks().subscribe((res: any) => {
      this.banks =  res.content;
      console.log('Bank_data', res);
      this.cacheService.setStorage(ENV.BANKCOUNT, res.count);
      this.loadingTable = false;
      this.utilService.startDatatable('listBanks');
    }, error => {
      console.log('Bank Response ', error);
      this.bootstrapNotifyService.error(error.error.description, error.error.code);
      this.loadingTable = false;
    });
  }
  public resetForm() {
    this.toggleView();
    this.bank = {
      id: null,
      name: null,
      bankCode: null,
      nipCode: null,
      accountPaymentUrl: null,
      accountCallBackUrl: null,
      createdBy: null,
      creator: null
    };
    this.updateMode = null;
    this.createdDisplay = {
      title: 'Create New Bank',
      btnTxt: 'Save Bank'
    };
  }

  /*public newResetForm() {
    this.secondToggleView();
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
  }*/

  public editBank(bank: any) {
    this.bank = this.updateMode = JSON.parse(JSON.stringify(bank));
    this.createdDisplay = {
      title: 'Update Bank',
      btnTxt: 'Save Bank'
    };
    this.toggleView();
  }

  public saveBank() {
    if (!this.bank.name) {
      return this.bootstrapNotifyService.info('Bank Name is required!');
    } else if (!this.bank.bankCode) {
      return this.bootstrapNotifyService.info('Bank Code is required!');
    } else if (!this.bank.nipCode) {
      return this.bootstrapNotifyService.info('Bank Nip Code is required!');
    } else if (this.updateMode) {
      this.updateBank();
    } else {
      this.createBank();
    }
  }
  private createBank() {
    this.loading = true;
    this.userService.createBank(this.bank).subscribe((res: any) => {
      this.loading = false;
      this.resetForm();
      this.bootstrapNotifyService.success(res.description, res.code);
      this.getBanks();
    }, error => {
      this.loading =  false;
      this.bootstrapNotifyService.error(error.error.description, error.error.code);
    });
  }
  private updateBank() {
    this.loading = true;
    this.userService.updateBank(this.bank, this.updateMode.id).subscribe((res) => {
      this.loading = false;
      console.log('Res', res);
      this.bootstrapNotifyService.success('bank updated!');
      this.resetForm();
      this.getBanks();
    }, error => {
      this.loading =  false;
      this.bootstrapNotifyService.error(error.error.description, error.error.code);
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

  public viewBank(bank) {
    console.log('activeBank', bank);
    this.bank = this.updateMode = JSON.parse(JSON.stringify(bank));
    this.createdDisplay = {
      title: 'BANK INFORMATION FOR ID',
      btnTxt: 'Save Bank'
    };
    this.secondToggleView();
  }

  openDetails(targetModal, bank) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('bankIdD').setAttribute('value', bank.id);
    document.getElementById('bankName').setAttribute('value', bank.name);
    document.getElementById('banksCode').setAttribute('value', bank.bankCode);
    document.getElementById('nipBankCode').setAttribute('value', bank.nipCode);
    document.getElementById('createdByBank').setAttribute('value', bank.createdBy);
    document.getElementById('bankCreator').setAttribute('value', bank.creator);
  }

  /*open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }*/

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public secondToggleView() {
    if ($('#viewClients').hasClass('d-none')) {
      $('#viewClients').removeClass('d-none');
      this.formPage = false;
    } else {
      $('#viewClients').addClass('d-none');
      this.formPage = true;
    }
  }
}

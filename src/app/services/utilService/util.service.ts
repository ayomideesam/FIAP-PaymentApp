import { Injectable } from '@angular/core';
// import * as JWT_DECODE from 'jwt-decode';
import {CacheService} from '../cacheService/cache.service';
import {environment as ENV} from '../../../environments/environment';
// import {IResponse} from '../../interfaces/iresponse';
import swal from 'sweetalert2';
import {UserService} from "../api-handlers/userService/user.service";
import {NavigatorService} from "../navigatorService/navigator.service";
import {BootstrapNotifyService} from "../bootstrap-notify/bootstrap-notify.service";
// import {EventsService} from '../eventServices/event.service';
// import {ScrollToConfigOptions, ScrollToService} from '@nicky-lenaers/ngx-scroll-to';
// import {BootstrapNotifyService} from '../bootstrap-notify/bootstrap-notify.service';
@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private dataTableInstance: any;
  constructor(private cacheService: CacheService) {  }

  public getAuthUser() {
    return this.cacheService.getSession(ENV.USERTOKEN);
  }
  public setAuthUser(user: any) {
    this.cacheService.setSession(ENV.USERTOKEN, user);
  }

  public setFullPageBackgroundImage() {
    setTimeout(() => {
      // after 1000 ms we add the class animated to the login/register card
      $('.card').removeClass('card-hidden');
    }, 200);
    const page = $('.full-page');
    const imageSrc = page.data('image');
    if (imageSrc !== undefined) {
      const imageContainer = '<div class="full-page-background" style="background-image: url(' + imageSrc + ') "/>';
      page.append(imageContainer);
    }
  }
  public getAuthToken() {
    const token = this.cacheService.getSession(ENV.TOKEN);
  }
  public openModal(id) {
    setTimeout(() => {
      ($('#' + id) as any).modal({show: true, backdrop: 'static', keyboard: false});
    }, 20);
  }
  public closeModal(id) {
    ($('#' + id) as any).modal('hide');
  }
  public startDatatable(id) {
    setTimeout(() => {
      this.initDataTable(id);
    }, 10); // 1000
  }

  public neutralDatatable(id, res, destroy = 'destroy') {
    setTimeout(() => {
      this.initDataTable(id, res, destroy);
    }, 1000);
  }
  public initDataTable(id, responsive = true, destroy = 'destroy') {
    // console.log('Is Destroy ', destroy);
    if (this.dataTableInstance && destroy === 'destroy') {
      // console.log('DESTROYER ', this.dataTableInstance);
      this.dataTableInstance.destroy();
    }
    const buttons = ['pdf', 'excel', 'csv'];
    setTimeout(() => {
      this.dataTableInstance = ($('#' + id)as any).DataTable({
        pagingType: 'full_numbers',
        dom: 'Blfrtip',
        keys: !0,
        buttons,
        // order: [[1, 'asc']],
        language: {
          search: '_INPUT_ <i class=\'fas fa-search\' (click)="searchfield()" style="cursor: pointer">',
          searchPlaceholder: 'Search...',
          paginate: {
            previous: '<i class=\'fa fa-angle-left\'>',
            next: '<i class=\'fa fa-angle-right\'>'
          }
        },
        select: {
          // style: 'multi'
        },
        columnDefs: [ {
          targets: 'no-sort',
          orderable: false,
        },
          { responsivePriority: 1, targets: 0 },
          { responsivePriority: 2, targets: -1 }
          ],
        lengthMenu: [
          [10, 50, 100, 150, -1],
          [10, 50, 100, 150, 'All']
        ],
        responsive,
      });
      // $('.dt-buttons .btn').removeClass('btn-secondary').addClass('btn-sm btn-primary');
      // Add event listener for opening and closing details
     /* $(`#${id} tbody`).on('click', 'td.details-control', (e) => {
        const tr = ($(this) as any).closest('tr');
        const row = this.dataTableInstance.row( tr );
        const target = $(`#${e.target.id}`);
        if ( row.child.isShown() ) {
          this.handleIconSwitch(target);
          tr.removeClass('shown');
          $('.dtr-details').addClass('table-bordered table-hover table-striped');

        } else {
          this.handleIconSwitch(target);
          tr.addClass('shown');
          $('.dtr-details').addClass('table-bordered table-hover table-striped');

        }
      });*/
    }, 0);

  }/*
  public handleIconSwitch(target) {
    if (target.hasClass('isShown')) {
      target.removeClass('isShown');
      target.addClass('isNotShown');
    } else {
      target.addClass('isShown');
      target.removeClass('isNotShown');
    }
  }*/
  public confirmAction(callback) {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success mx-1',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    });
    swalWithBootstrapButtons({
      title: 'Are you sure?',
      text: `You won't be able to revert action! `,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        callback();
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
        console.log('Action not completed!');
      }
    });
  }
  public randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  public actionRequireConfirmed(callback) {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success mx-1',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    });
    swalWithBootstrapButtons({
      title: 'Are you sure?',
      text: `This action is not reversible`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        callback();
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
        console.log('Action not completed!');
      }
    });
  }

  public initPassword(){
    document.getElementById("overlay").style.display = "block";
  }

  public closePassword(){
    document.getElementById("overlay").style.display = "none";
  }


}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {EventsService} from '../../../services/eventServices/event.service';
import {NavigatorService} from '../../../services/navigatorService/navigator.service';
import {CacheService} from '../../../services/cacheService/cache.service';
import {GuardService} from '../../../services/gaurdService/guard.service';
import {NotifyComponent} from '../../components/notify/notify.component';
import {CSVService} from '../../../services/csvServices/pdf.service';
import {ChangePasswordComponent} from '../../components/change-password/change-password.component';
import {SidebarComponent} from '../../layout/dashboard/sidebar/sidebar.component';
import {FooterComponent} from '../../layout/dashboard/footer/footer.component';
import {HeaderComponent} from '../../layout/dashboard/header/header.component';
import {NotificationService} from '../../../services/notificationServices/notification.service';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  declarations: [
    NotifyComponent,
    SidebarComponent,
    FooterComponent,
    ChangePasswordComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
    EventsService,
    NavigatorService,
    GuardService,
    CacheService,
    NotificationService,
    CSVService
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NotifyComponent,
    SidebarComponent,
    FooterComponent,
    ChangePasswordComponent,
    NgSelectModule,
    ReactiveFormsModule,
    HeaderComponent
    ]
})
export class SharedModule { }

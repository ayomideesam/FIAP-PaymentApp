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
import {MatDividerModule} from "@angular/material/divider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatMenuModule} from "@angular/material/menu";
import {HighchartsChartModule} from "highcharts-angular";
import {AreaComponent} from "../../layout/dashboard/area/area.component";
import {TransactionTablesComponent} from '../../layout/dashboard/transaction-tables/transaction-tables.component';
import {MatCardModule} from "@angular/material/card";
import {PieComponent} from '../../layout/dashboard/pie/pie.component';
import {ReconfirmPasswordComponent} from "../../components/reconfirm-password/reconfirm-password.component";
import {PluginComponent} from '../../layout/dashboard/plugin/plugin.component';

@NgModule({
  declarations: [
    NotifyComponent,
    SidebarComponent,
    FooterComponent,
    ChangePasswordComponent,
    HeaderComponent,
    AreaComponent,
    TransactionTablesComponent,
    PieComponent,
    ReconfirmPasswordComponent,
    PluginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    RouterModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatMenuModule,
    HighchartsChartModule,
    MatCardModule

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
    HeaderComponent,
    AreaComponent,
    TransactionTablesComponent,
    PieComponent,
    ReconfirmPasswordComponent,
    PluginComponent
    ]
})
export class SharedModule { }

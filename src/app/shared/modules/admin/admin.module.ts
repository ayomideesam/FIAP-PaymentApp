import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {adminRouting} from '../../../app-routing';

import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatMenuModule} from "@angular/material/menu";
import {HighchartsChartModule} from "highcharts-angular";
import {DashboardService} from "../../../services/dashboard.service";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from "@angular/material/table";

@NgModule({
  imports: [
    SharedModule,
    adminRouting.routes,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatMenuModule,
    HighchartsChartModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [
    adminRouting.providers,
    DashboardService
  ],
  entryComponents: [
    adminRouting.entryComponent,
  ],
  declarations: [
    adminRouting.components
  ],
  exports: [
    adminRouting.components
  ]
})
export class AdminModule { }

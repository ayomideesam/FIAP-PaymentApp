import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {adminRouting} from '../../../app-routing';

@NgModule({
  imports: [
    SharedModule,
    adminRouting.routes
  ],
  providers: [
    adminRouting.providers
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

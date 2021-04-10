import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {landingRouting} from './app-routing';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './shared/modules/core/core.module';
import {SharedModule} from './shared/modules/shared/shared.module';
import {FormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    landingRouting.components,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    landingRouting.routes,
    CoreModule,
    SharedModule,
    FormsModule,
    NgbModule
  ],
  providers: [landingRouting.providers],
  bootstrap: [AppComponent]
})
export class AppModule { }

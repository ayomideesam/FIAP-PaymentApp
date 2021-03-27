import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {landingRouting} from './app-routing';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './shared/modules/core/core.module';
import {SharedModule} from './shared/modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    landingRouting.components
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    landingRouting.routes,
    CoreModule,
    SharedModule
  ],
  providers: [landingRouting.providers],
  bootstrap: [AppComponent]
})
export class AppModule { }

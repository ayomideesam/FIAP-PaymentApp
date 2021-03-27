import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {GuardService} from '../../../services/gaurdService/guard.service';
import {AuthService} from '../../../services/authService/auth.service';
import {ApiService} from '../../../services/api/api.service';
import {UserService} from '../../../services/api-handlers/userService/user.service';
import {EnsureModuleLoadedOnceGuard} from '../moduleGuard/ensure-module-loaded-once.guard';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    GuardService,
    AuthService,
    ApiService,
    UserService
  ],
  declarations: []
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}

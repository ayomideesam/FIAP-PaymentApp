import {ModuleWithProviders} from '@angular/core';

export interface IRouting {
  routes: ModuleWithProviders<any>;
  components: any[];
  entryComponent: any[];
  providers: any[];
}


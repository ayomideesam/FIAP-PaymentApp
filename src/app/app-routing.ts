import {IRouting} from './interfaces/irouting';
import {RouterModule, Routes} from '@angular/router';
import {AdminRoutesComponent} from './admin/admin-routes/admin-routes.component';
import {UserRoutesComponent} from './user/user-routes/user-routes.component';
import {LoginComponent} from './landing/login/login.component';
import {GuardService, RoleServiceAdmin, RoleServiceClient} from './services/gaurdService/guard.service';
import {UserDashboardComponent} from './user/user-dashboard/user-dashboard.component';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {ForgotPasswordComponent} from './landing/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './landing/reset-password/reset-password.component';
import {LFooterComponent} from './shared/layout/landing/l-footer/l-footer.component';
import {LHeaderComponent} from './shared/layout/landing/l-header/l-header.component';
import {ChangePasswordComponent} from './shared/components/change-password/change-password.component';
import {ClientTypesComponent} from './admin/client-types/client-types.component';
import {ManageClientsComponent} from './admin/manage-clients/manage-clients.component';
import {ManageClientDocumentsComponent} from './admin/manage-client-documents/manage-client-documents.component';


const landingRoutes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password/:token', component: ResetPasswordComponent},

  {path: 'client', loadChildren: () => import('./shared/modules/user/user.module').then(m => m.UserModule)},

  {path: 'admin', loadChildren: () => import('./shared/modules/admin/admin.module').then(m => m.AdminModule)},

  {path: '**', component: LoginComponent},
];

export const landingRouting: IRouting = {
  routes: RouterModule.forRoot(landingRoutes, {useHash: false}),
  components: [
    LoginComponent,
    ForgotPasswordComponent,
    LHeaderComponent,
    LFooterComponent,
    ResetPasswordComponent
  ],
  entryComponent: [],
  providers: []
};


export const userRoutes: Routes = [
  {path: '', component: UserRoutesComponent, children: [
    {path: '', redirectTo: 'manage-documents', pathMatch: 'full', canActivate: [], data: {roles: 'CLIENT'}},
    {path: 'manage-documents', component: UserDashboardComponent},
    {path: 'change-password', component: ChangePasswordComponent, canActivate: [], data: {roles: 'CLIENT'}},
  ], canActivate: [], data: {roles: 'CLIENT'}},
  {path: '**', component: UserRoutesComponent, canActivate: [], data: {roles: 'CLIENT'}}
];

export const userRouting: IRouting = {
  routes: RouterModule.forChild(userRoutes),
  components: [
    UserRoutesComponent,
    UserDashboardComponent],
  entryComponent: [],
  providers: [RoleServiceClient]
};

export const adminRoutes: Routes = [
  {path: '', component: AdminRoutesComponent, children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [], data: {roles: 'ADMIN'}},
    {path: 'dashboard', component: AdminDashboardComponent, canActivate: [], data: {roles: 'ADMIN'}},
    {path: 'client-types', component: ClientTypesComponent, canActivate: [GuardService, RoleServiceAdmin], data: {roles: 'ADMIN'}},
    {path: 'manage-clients', component: ManageClientsComponent, canActivate: [GuardService, RoleServiceAdmin], data: {roles: 'ADMIN'}},
    {path: 'client/:clientId/manage-documents', component: ManageClientDocumentsComponent, canActivate: [GuardService, RoleServiceAdmin],
      data: {roles: 'ADMIN'}},
    {path: 'change-password', component: ChangePasswordComponent, canActivate: [GuardService, RoleServiceAdmin], data: {roles: 'ADMIN'}},
  ]
  },
  {path: '**', component: AdminRoutesComponent, canActivate: [GuardService, RoleServiceAdmin], data: {roles: 'ADMIN'} }
];

export const adminRouting: IRouting = {
  routes: RouterModule.forChild(adminRoutes),
  components: [
    AdminRoutesComponent,
    AdminDashboardComponent,
    ClientTypesComponent,
    ManageClientsComponent,
    ManageClientDocumentsComponent
  ],
  entryComponent: [],
  providers: [RoleServiceAdmin]
};


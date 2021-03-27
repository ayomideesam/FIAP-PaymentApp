import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../authService/auth.service';
import {Observable} from 'rxjs';
import {CacheService} from '../cacheService/cache.service';
import {environment as ENV} from '../../../environments/environment';

@Injectable()
export class GuardService implements CanActivate {
  constructor( private router: Router,
               private authService: AuthService, private cacheService: CacheService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin();
  }
  checkLogin(): boolean {
     if (this.authService.checkLogin()) {
       return true;
     } else {
       this.router.navigate([ '/' ]); // then ask user to login
       this.logOut();
       return false;
     }
  }

  /**
   * Log out from system
   */
  logOut() {
    this.cacheService.clearStorage();
    this.cacheService.clearSession();
  }

}
export class RoleServiceAdmin implements CanActivate {
  static getAuthRole() {
    return JSON.parse(sessionStorage.getItem(ENV.ROLE));
  }
  static checkRole(roles): boolean {
    if (!roles.length) { return false; }
    const userRole = RoleServiceAdmin.getAuthRole().toUpperCase();
    if (userRole && userRole === 'ADMIN' && roles.includes('ADMIN')) {
      return true;
    } else {
      return userRole === 'SUPER' && roles.includes('ADMIN');
    }
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const roles: any = route.data;
    // console.log('Roles', roles, state.url);
    return RoleServiceAdmin.checkRole(roles.roles);
  }
  }

export class RoleServiceClient implements CanActivate {
  static checkRole(roles): boolean {
    if (!roles.length) { return false; }
    const userRole = RoleServiceAdmin.getAuthRole().toUpperCase();
    if (userRole && userRole === 'CLIENT' && roles.includes('CLIENT')) {
      return true;
    } else {
      return userRole === 'USER' && roles.includes('CLIENT');
    }
  }
  constructor( ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const roles: any = route.data;
    return RoleServiceClient.checkRole(roles.roles);
  }
  }

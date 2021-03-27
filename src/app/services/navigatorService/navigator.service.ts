import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  /**
   *
   * @param url
   */
  navigateUrl(url: string) {
    // {relativeTo: this.activatedRoute}
    this.router.navigate([url]);
}
}

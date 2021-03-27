import { Component, OnInit } from '@angular/core';
import {CacheService} from '../../../../services/cacheService/cache.service';
import { environment as ENV } from '../../../../../environments/environment';

@Component({
  selector: 'app-l-header',
  templateUrl: './l-header.component.html',
  styleUrls: ['./l-header.component.css']
})
export class LHeaderComponent implements OnInit {

  constructor(private cacheService: CacheService) { }

  ngOnInit(): void {
    this.cacheService.deleteSession(ENV.TOKEN);
    this.cacheService.deleteStorage(ENV.TOKEN);
  }

}

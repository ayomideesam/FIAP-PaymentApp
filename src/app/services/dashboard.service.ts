import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  bigChart() {
    return [{
      name: 'Lagos',
      data: [702, 835, 1009, 1147, 1602, 3834, 5468]
    }, {
      name: 'Abuja',
      data: [306, 357, 381, 583, 851, 1067, 1966]
    }, {
      name: 'Ogun',
      data: [163, 203, 276, 408, 547, 729, 628]
    }, {
      name: 'Anambra',
      data: [18, 31, 54, 156, 339, 818, 1201]
    }, {
      name: 'Jos',
      data: [2, 2, 2, 6, 13, 30, 46]
    }];
  }

  pieChart() {
    return [{
      name: 'BANK TELLER',
      y: 38.6,
      sliced: true,
      selected: true
    }, {
      name: 'INTERNET BANKING',
      y: 11.6
    }, {
      name: 'MOBILE PHONE',
      y: 10.6
    }, {
      name: 'POS TERMINALS',
      y: 4.6
    }, {
      name: 'ATM',
      y: 4.1
    }, {
      name: 'VENDOR/MERCHANT WEB PORTAL',
      y: 1.64
    }, {
      name: 'THIRD-PARTY PAYMENT PLATFORM',
      y: 2.1
    }, {
      name: 'UNSTRUCTURED SUPPLEMENTARY SERVICE DATA (USSD)',
      y: 3.4
    }, {
      name: 'OTHER CHANNELS',
      y: 9.3
    }, {
      name: 'SOCIAL MEDIA',
      y: 2.6
    }, {
      name: 'AGENCY BANKING',
      y: 2.2
    }];
  }
}

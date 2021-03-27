import {Component, OnInit, ViewEncapsulation} from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-root',
  template: `<app-notify-new></app-notify-new><router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    const cssRule = 'color: rgb(249, 162, 34);' +
      'font-size: 17px;' +
      'text-align: center' +
      'font-weight: bold;' +
      'text-shadow: 1px 1px 5px rgb(249, 162, 34);' +
      'filter: dropshadow(color=rgb(249, 162, 34), offx=1, offy=1);';
    setTimeout(console.info.bind(console, '%cUpperlink KYC', cssRule), 0);

  }
}

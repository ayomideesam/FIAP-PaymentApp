import {Component, OnInit, ViewEncapsulation, ElementRef, ViewChild} from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-root',
  template: `<div #topScrollAnchor></div><app-notify-new></app-notify-new><router-outlet (activate)="onNavigate($event)"></router-outlet>`,
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    const cssRule = 'color: rgb(rgb(255, 75, 43));' +
      'font-size: 17px;' +
      'text-align: center' +
      'font-weight: bold;' +
      'text-shadow: 1px 1px 5px rgb(249, 162, 34);' +
      'filter: dropshadow(color=rgb(249, 162, 34), offx=1, offy=1);';
    setTimeout(console.info.bind(console, '%cUpperlink Fiap Portal', cssRule), 0);
  }

  @ViewChild('topScrollAnchor') topScroll: ElementRef;

  onNavigate(event): any {
    this.topScroll.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

}

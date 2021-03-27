/* tslint:disable */
import {Component, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {EventsService} from '../../../services/eventServices/event.service';

@Component({
  selector: 'app-notify-new',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class NotifyComponent implements OnInit {
  alertReady: boolean;
  public alert = {
    visible: false,
    message: '',
    title: '',
    type: '',
    alert_class: ''
  };
  public alertClosure: any;
  public message: any;
  constructor(private eventService: EventsService,
              private zone: NgZone) {
    this.alertReady = false;
    this.eventService.on('AlertMessage', data => {
      this.zone.run(() => {
        this.alertReady = true;
        clearTimeout(this.alertClosure);
        this.alert = data;
        this.alert['visible'] = true;
        this.message = this.alert['message'];
        this.closeAlert();
        this.eventService.on('closerAlertMessage', () => {
          this.alert['visible'] = false;
          clearTimeout(this.alertClosure);
        });
      });
    });
  }

  ngOnInit() {
  }
  public closeAlertNow() {
    // $('.alert-custom-design').addClass('fadeOutUp-custom');
    setTimeout(() => {
      this.alert['visible'] = false;
      // $('.alert-custom-design').removeClass('fadeOutUp-custom');
    }, 400);
    this.cleanOldClass();
  }
  public closeAlert() {
    // $('.alert-custom-design').addClass('fadeOutUp-custom');
    this.alertClosure = setTimeout(() => {
      this.alert['visible'] = false;
      // $('.alert-custom-design').removeClass('fadeOutUp-custom');
    }, 4000);
    this.cleanOldClass();
  }
  private cleanOldClass() {
    setTimeout(() => {
      $('.alert-custom-design').removeClass('fadeOutUp-custom');
    }, 0);
  }
}

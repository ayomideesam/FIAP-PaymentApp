/* tslint:disable */

import {Injectable} from '@angular/core';
import {EventsService} from '../eventServices/event.service';

@Injectable()
export class NotificationService {
  public alert = {
    visible: false,
    message: '',
    type: '',
    alert_class: ''
  };

  constructor( private eventsService: EventsService) {
  }


  success(message: string) {
    this.alert.alert_class = 'alert alert-success animated bounceInRight';
    this.alert.message = `<i class='fa fa-check-circle' aria-hidden='true'></i>  ${message}`;
    this.alert.visible = true;
    this.alert.type = 'success';
    this.eventsService.broadcast('AlertMessage', this.alert);
    return this.alert;
  }


  info(message: string) {
    this.alert.alert_class = 'alert alert-info animated bounceInRight';
    this.alert.message = `<i class='fa fa-info-circle' aria-hidden='true'></i> ${message}`;
    this.alert.visible = true;
    this.alert.type = 'info';
    this.eventsService.broadcast('AlertMessage', this.alert);
    return this.alert;
  }


  warning(message: string) {
    this.alert.alert_class = 'alert alert-warning animated bounceInRight';
    this.alert.message = `<i class='fa fa-warning' aria-hidden='true'></i> ${message}`;
    this.alert.visible = true;
    this.alert.type = 'warning';
    this.eventsService.broadcast('AlertMessage', this.alert);
    return this.alert;
  }


  error(message: string, data?: any | Array<string> | Array<any>) {
    console.info('data error :: ', data);
    this.alert.alert_class = 'alert alert-danger animated bounceInRight';
    if (data) {
      if (data.error && data.error.errors) {
        this.alert.message = `<i class='fa fa-exclamation-triangle' aria-hidden='true'></i> ${data.error.errors[0]}`;
      } else if (data.message) {
        // this.alert['message'] = `<i class='fa fa-exclamation-triangle' aria-hidden='true'></i> ${data['message']}`;
        this.alert.message = `<i class='fa fa-exclamation-triangle' aria-hidden='true'></i> ${data.message}`;
      }
      if (data.error && data.error.message) {
        console.info('data error :: ', data.error.message);
        this.alert.message = `<i class='fa fa-exclamation-triangle' aria-hidden='true'></i> ${data.error.message}`;
      }
    } else {
      this.alert.message = `<i class='fa fa-exclamation-triangle' aria-hidden='true'></i> ${message}`;
    }
    this.alert.visible = true;
    this.alert.type = 'error';
    this.eventsService.broadcast('AlertMessage', this.alert);
    console.log('Alert Message ', this.alert);
    return this.alert;
  }

}

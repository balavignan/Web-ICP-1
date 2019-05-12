import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { ToasterService } from 'angular2-toaster';
import { NotificationService } from './_shared/services/notification.service';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _notif: NotificationService;
  notifActivate: boolean;
  constructor(
    private router: Router,
    _notif: NotificationService
  ) {
    this._notif = _notif;
    this.notifActivate = this._notif.activatePopup;
  }
  title = 'app';

  popupClicked(event) {
    console.log('poppup clicking');
    this._notif.activatePopup = event;
    this.notifActivate = event;
    // this._notif.pop('message1', 'message2', 3000);
  }

}

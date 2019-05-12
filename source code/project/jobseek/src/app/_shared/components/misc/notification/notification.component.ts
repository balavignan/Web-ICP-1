import { Component, OnInit, Output, HostBinding, Directive, HostListener, Input, OnChanges, SimpleChange, EventEmitter, SimpleChanges } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
// import { NotificationService } from '../../../_shared/notification.service';

// @Directive({
//   // tslint:disable-next-line:directive-selector
//   selector: '[popup]'
// })
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit, OnChanges {

  @HostBinding('attr.class') cssClass = 'active';
  @Output()
  donePopup = new EventEmitter<boolean>();
  // @Input() data: any;
  message: string;
  title: string;
  isActive: boolean;
  stay: number;

  constructor(public _notif: NotificationService) {

    this.message = _notif.message;
    this.title = _notif.title;
    this.stay = _notif.stay;
    this.isActive = _notif.activatePopup;
    // this.cssClass = this.isActive ? 'active' : 'hidden';
    console.log('_notif- ', _notif);
    setTimeout(() => {
      this.donePopup.emit(false);
    }, this.stay);
  }


  ngOnInit() {
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (this.data) {
  // Object.assign(this, this.data);
  //   }
  //   console.log(this);
  // }
  ngOnChanges() {
    this.message = this._notif.message;
    this.title = this._notif.title;
    this.stay = this._notif.stay;
    this.isActive = this._notif.activatePopup;
  }
  @HostListener('click') displayMessage(): void {
    console.log('messa: ', this.message);
    this.donePopup.emit(false);
  }
}

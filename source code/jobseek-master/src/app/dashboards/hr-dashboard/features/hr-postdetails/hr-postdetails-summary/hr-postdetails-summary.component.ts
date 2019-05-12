import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hr-postdetails-summary',
  templateUrl: './hr-postdetails-summary.component.html',
  styleUrls: []
})
export class HrPostdetailsSummaryComponent implements OnInit {

  @Input()
  hrpost: any;

  a: any;
  constructor() {
    this.a = this.hrpost;
    console.log('nulls is hers', this.hrpost);
  }

  ngOnInit() {
    // if (this.hrpost == null) {
    // }
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-view-post-deatilssummary',
  templateUrl: './user-view-post-deatilssummary.component.html',
  styleUrls: []
})
export class UserViewPostDeatilssummaryComponent implements OnInit {
@Input()
hrpost;
  constructor() {
    console.log('SSSSSSSSSSSSS', this.hrpost);
   }

  ngOnInit() {
  }

}

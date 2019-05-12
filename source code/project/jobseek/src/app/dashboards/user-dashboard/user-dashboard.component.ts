import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: []
})
export class UserDashboardComponent implements OnInit {
  constructor( private router: Router) {
  }

  ngOnInit() {
  }

}

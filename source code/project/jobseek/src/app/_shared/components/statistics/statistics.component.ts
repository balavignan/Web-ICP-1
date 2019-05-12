import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  users = 2000;
  placed = 100;
  companies = 200;

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.placed++;
    }, 20000);
    setInterval(() => {
      this.users++;
    }, 1000);
    setInterval(() => {
      this.companies++;
    }, 1000);
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hr-manage-applicant-list',
  templateUrl: './hr-manage-applicant-list.component.html',
  // styleUrls: ['./hr-manage-applicant-list.component.css']
})
export class HrManageApplicantListComponent implements OnInit {

  @Input()
  applicants;

  @Output()
  viewProfiles = new EventEmitter<string>();
   viewProfile() {
    this.viewProfiles.emit(this.applicants);
   }

  ngOnInit() {

  }

}

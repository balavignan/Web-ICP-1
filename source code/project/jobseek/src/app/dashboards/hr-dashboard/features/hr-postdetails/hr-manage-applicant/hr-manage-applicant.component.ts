import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../../../../../_shared/services/data.service';
import { HrbaseService } from '../../../../../_shared/services/hrbase.service';
import { ApplicantBase } from '../../../../../_shared/models/applicantbase';
import { HrPostDetail } from '../../../../../_shared/models/hrpostdetails';
import { Hrbase } from '../../../../../_shared/models/hrbase';
import { uuid } from '../../../../../_shared/models/uuid';

@Component({
  selector: 'app-hr-manage-applicant',
  templateUrl: './hr-manage-applicant.component.html',
  // styleUrls: ['./hr-manage-applicant.component.css']
})
export class HrManageApplicantComponent implements OnInit {
  hrdata:Hrbase;
  id:string;
  error_text: string;
  manageBack: boolean;
  textInfo: string;
  applicant: ApplicantBase;
  applicantDetailsInfo: boolean;
  manageApplicantInfo: boolean;
  hrpost: HrPostDetail;
  loadPage = false;
  loadError = false;
  chatOpen = false;
  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private hrbaseservice: HrbaseService,
    private location: Location
  ) {
    this.manageApplicantInfo = true;
    this.applicantDetailsInfo = false;
    this.textInfo = '';
    this.manageBack = true;
    this.id = uuid();
  }

  ngOnInit() {
    // console.log('hrpost', this.hrpost);
    // this.data.currentMessage.subscribe(message => this.hrpost = message );
    this.hrbaseservice.getHrDetailsById(this.id).subscribe((data) => {
      console.log('hr dqata', this.hrdata);
      
      this.hrdata = data;
    });
    this.applicantdetails();
    
  }
  viewprofile(event) {
     console.log('applicant data', event);
     if (!this.applicantDetailsInfo) {
     this.applicant = event;
      this.applicantDetailsInfo = true;
      this.manageApplicantInfo = false;
      this.textInfo = 'Back';
      this.manageBack = false;
  } else {
    this.applicantDetailsInfo = false;
      this.manageApplicantInfo = true;
      this.textInfo = '';
      this.applicantdetails();
      this.manageBack = true;
  }
  }
  applicantdetails() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const hrpost_id = params.get('id');
      this.hrbaseservice.getHrPostById(hrpost_id, {
        'isHr': true,
        'isApplicant': false
      }).
        subscribe((hrpost: any) => {
          console.log(hrpost);
          this.hrpost = hrpost;
          this.loadPage = true;
        })
        // .catch((error=>{
        //   this.loadError = true;
        //  this.error_text = "Get error on server request ";
        //  }))
    });
  }
  backpage() {
    this.location.back();
  }
}

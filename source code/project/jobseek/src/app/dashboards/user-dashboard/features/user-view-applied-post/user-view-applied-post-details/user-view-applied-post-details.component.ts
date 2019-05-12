import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { HrbaseService } from '../../../../../_shared/services/hrbase.service';
import { UserBaseService } from '../../../../../_shared/services/user-base.service';
import { ApplicantBase } from '../../../../../_shared/models/applicantbase';
import { HrPostDetail } from '../../../../../_shared/models/hrpostdetails';
import { uuid } from '../../../../../_shared/models/uuid';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
declare const $: any;

@Component({
  selector: 'app-user-view-applied-post-details',
  templateUrl: './user-view-applied-post-details.component.html'
})
export class UserViewAppliedPostDetailsComponent implements OnInit {
  isshortlist: string;
  userdata: ApplicantBase;
  id: string;
  chatOpen: boolean;
  uploadNewCv: boolean;
  hrpost: any;
  st: any;
  private userStatus = new BehaviorSubject<any>({});
  public userStatusAs = this.userStatus.asObservable().pipe();

  constructor(private route: ActivatedRoute,
    private hrbaseservice: HrbaseService,
    private userbaseservice: UserBaseService,
    private router: Router) {
    this.uploadNewCv = false;
    this.chatOpen = false;
    this.id = uuid();
  }
  ngOnInit() {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      const hrpost_id = params.get('user-post.id');
      await this.hrbaseservice.getHrPostById(hrpost_id, {
        'isHr': false,
        'isApplicant': true
      }).subscribe((res) => {
        this.hrpost = res;
        //  console.log('hrdata from applied',this.hrpost);
        return this.shortlisted();
      });
      console.log('hrpost from applied', this.hrpost);
      this.userbaseservice.getUserDetailsById(this.id).subscribe((res) => {
        this.userdata = res;
        //  console.log('userdata from applied',this.userdata);
        return this.userdata;
      });

    });


    this.userStatus.next({
      'isHr': true,
      'isApplicant': false
    });

    this.st = {
      'isHr': false,
      'isApplicant': true
    };
  }
  shortlisted() {
    console.log('applicant', this.hrpost.applicants);
    this.hrpost.applicants.map((ele) => {
      console.log('shortlisted', ele.isShortlisted
      );
      if (ele._id._id === this.id) {
        this.isshortlist = ele.isShortlisted;
        console.log(this.isshortlist);
      }
    });
  }

  chatOpenClicked() {
    this.chatOpen = !this.chatOpen;
  }
}



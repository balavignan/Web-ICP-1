import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Router } from '@angular/router';
import { HrbaseService } from '../../../../../_shared/services/hrbase.service';
import { UserBaseService } from '../../../../../_shared/services/user-base.service';
import { ApplicantBase } from '../../../../../_shared/models/applicantbase';
import { HrPostDetail } from '../../../../../_shared/models/hrpostdetails';
import { uuid } from '../../../../../_shared/models/uuid';

declare const $: any;

@Component({
  selector: 'app-user-view-post-details',
  templateUrl: './user-view-post-details.component.html',
  styleUrls: ['./user-view-post-details.component.css']
})
export class UserViewPostDetailsComponent implements OnInit {

  isApply: boolean;
  userdata: ApplicantBase;
  id: string;
  uploadNewCv: boolean;
  hrpost: any;

  constructor(private route: ActivatedRoute,
              private hrbaseservice: HrbaseService,
              private userbaseservice: UserBaseService,
              private router: Router) {
    this.uploadNewCv = true;
    this.id = uuid();
    this.isApply = false;
  }
  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {
      const hrpost_id = params.get('user-post.id');
      this.hrbaseservice.getHrPostById(hrpost_id, {
        'isHr': false,
        'isApplicant': true
      }).
      subscribe((hrpost: any) => {
        this.hrpost = hrpost;
        this.shortlisted();
      });
    });

    this.userbaseservice.getUserDetailsById(this.id).
    subscribe((userdata) => {
      this.userdata = userdata;
    });
  }


  uploadNew() {
    this.uploadNewCv = true;
  }

  uploadOld() {
    // this.uploadNewCv = false;
  }


  shortlisted() {
    console.log('shhhhhhhooooooooo', this.hrpost.applicants);
    this.hrpost.applicants.map((ele) => {
      if ( ele._id && (this.id === ele._id._id)) {
        console.log(ele._id._id);
        this.isApply = true;
        console.log(this.isApply);
      }
    });
  }

  applyToPost() {
    console.log('post_id', this.hrpost._id);
    console.log('id', this.id);
    this.userbaseservice.updateUserApplyPost(this.hrpost._id, this.id).
    subscribe(() => {
      console.log('successfully applied and notified');
      // this.router.navigateByUrl('user-view-post');

      this.router.navigate(['user-view-post'], { relativeTo: this.route.parent });
    });
  }

}

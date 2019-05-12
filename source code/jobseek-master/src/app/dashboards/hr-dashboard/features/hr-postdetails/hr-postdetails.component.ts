import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HrbaseService } from '../../../../_shared/services/hrbase.service';
import { DataService } from '../../../../_shared/services/data.service';
import { HrPostDetail } from '../../../../_shared/models/hrpostdetails';
import { Hrbase } from '../../../../_shared/models/hrbase';
import { uuid } from '../../../../_shared/models/uuid';
@Component({
  selector: 'app-hr-postdetails',
  templateUrl: './hr-postdetails.component.html',
  styleUrls: ['./hr-postdetails.component.css']
})
export class HrPostdetailsComponent implements OnInit {
  hrdata: Hrbase;
  id: string;
  editviewback: boolean;
  postviewback: boolean;
  editpostDetailsInfo: boolean;
  textInfo: string;

  postDetailsInfo: boolean;
  hrpost: any;
  constructor(private route: ActivatedRoute,
    private hrbaseservice: HrbaseService,
    private data: DataService,
    private router: Router,
    private location: Location) {
    this.postDetailsInfo = true;
    this.editpostDetailsInfo = false;
    this.textInfo = 'Manage Applicant';
    this.postviewback = true;
    this.editviewback = false;
    this.id = uuid();
  }

  ngOnInit() {
    this.hrbaseservice.getHrDetailsById(this.id).subscribe((data) => {
      this.hrdata = data;
    });
    this.postdetails();

  }

  manageApplicant() {
    this.data.changeMessage(this.hrpost);
    this.router.navigate(['jobs-posted/' + this.hrpost._id + '/manageApplicant']);
  }
  editpost() {
    this.postviewback = false;
    this.editviewback = true;
    this.postDetailsInfo = false;
    this.editpostDetailsInfo = true;
  }
  postdetails() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const hrpost_id = params.get('id');
      this.hrbaseservice.getHrPostById(hrpost_id, {
        'isHr': true,
        'isApplicant': false
      }).
        subscribe((hrpost: any) => {
          console.log(hrpost);
          this.hrpost = hrpost;
          this.hrpost.dateOfJoining = this.hrpost.dateOfJoining.replace(/T00:00:00.000Z/, '');
          this.hrpost.startdate = this.hrpost.startdate.replace(/T00:00:00.000Z/, '');
          this.hrpost.enddate = this.hrpost.enddate.replace(/T00:00:00.000Z/, '');
          // console.log('hrpost',this.hrpost);
        });
    });
  }

  postbackpage() {
    this.location.back();
  }
  editbackpage() {
    this.postviewback = true;
    this.editviewback = false;
    this.postDetailsInfo = true;
    this.editpostDetailsInfo = false;
  }
  deletepost() {
    const windowStatus = window.confirm('confirm to delete post');
    if (windowStatus) {
      this.hrbaseservice.deleteHrPost(this.hrpost._id).subscribe(() => {
        this.router.navigateByUrl('hr/jobs-posted');
        console.log('deleted successfully');
      });
    }
  }
}

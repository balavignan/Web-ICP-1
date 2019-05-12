import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserBaseService } from '../../../../_shared/services/user-base.service';
import { HrPostDetail } from '../../../../_shared/models/hrpostdetails';
import { uuid } from '../../../../_shared/models/uuid';
import { ApplicantBase } from '../../../../_shared/models/applicantbase';

@Component({
  selector: 'app-user-view-applied-post',
  templateUrl: './user-view-applied-post.component.html'
})
export class UserViewAppliedPostComponent implements OnInit {
  error_text: string;
  userdata: ApplicantBase;
  hrpost: HrPostDetail[];
  p: number;
  id: string;
  loadPage = false;
  loadError = false;
  constructor(private userbaseservice: UserBaseService,
    private router: Router, private route: ActivatedRoute) {
    this.id = uuid();
  }

  ngOnInit() {
    this.userbaseservice.getUserDetailsById(this.id).subscribe((res)=>{
      this.userdata=res;
       console.log('userdata from applied',this.userdata);
       return  this.userdata;
        });
    this.userbaseservice.getUserApplyPost(this.id).
    subscribe((hrpost: any) => {
      console.log('applied data', hrpost);
     this.hrpost = hrpost;
     this.loadPage = true;
    });
    // .catch((error=>{
    //   this.loadError = true;
    //  this.error_text = "Get error on server request ";
    //  }));
  this.p = 1;
  }
  routeronclicked(hrpost_id) {
    // this.router.navigateByUrl('user-profile/applied-job/' + hrpost_id);
    this.router.navigate([hrpost_id], {relativeTo: this.route});
    // console.log(hrpost_id);
  }

}

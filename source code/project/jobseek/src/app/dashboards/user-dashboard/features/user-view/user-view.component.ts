import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HrbaseService } from '../../../../_shared/services/hrbase.service';
import { UserBaseService } from '../../../../_shared/services/user-base.service';
import { HrPostDetail } from '../../../../_shared/models/hrpostdetails';
import { ApplicantBase } from '../../../../_shared/models/applicantbase';
import { uuid } from '../../../../_shared/models/uuid';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})

export class UserViewComponent implements OnInit {
  error_text: string;
  p: Number;
  jobtext: String;
  searchBarInfo: boolean;
  searchBarInfo1: boolean;
  id: any;
  suggestedjob: HrPostDetail[];
  jobData: any;
  searchData: any;
  searchInfo: boolean;
  jobInfo: boolean;
  searchText: any;
  searchLocation: any;
  userdata: ApplicantBase;
  hrpost: HrPostDetail[];
  loadPage = false;
  loadError = false;
  searchpage = false;
  recomendedSkill: string[];
  constructor(private hrbaseservice: HrbaseService,
    private userbaseservice: UserBaseService,
    private router: Router,
    private route: ActivatedRoute) {
    this.id = uuid();
    this.jobInfo = true;
    this.p = 1;
  }
  ngOnInit() {
    this.userbaseservice.getUserDetailsById(this.id).
      subscribe((userdata: any) => {
        console.log('maindata');
        console.log('maindata', userdata.data);
        this.userdata = userdata;
        this.suggestedjobs();
      });
  }
  suggestedjobs() {
    console.log('hello');

    this.hrbaseservice.getAllUserViewPost().
      subscribe((hrpost: any) => {
        console.log('hrpost', this.userdata);
        this.hrpost = hrpost;
        this.suggestedjob = this.hrpost.filter((ele) => {
          if (this.userdata.skillValue && this.userdata.skillValue.length > 0) {
            const data = ele.skills.filter((ele1) => {

              if (this.userdata.skillValue.toString().toLowerCase().includes(ele1.toLowerCase())) {

                return ele1;
              }
            });

            if (data.length > 0) {
              return ele;
            } else {
              return this.getpostfromlocation(ele);
            }
          } else {
            return this.getpostfromlocation(ele);
          }
        });
        console.log('post', this.suggestedjob);
        this.loadPage = true;
      });
    // .catch((error=>{
    //   this.loadError = true;
    //  this.error_text = "Get error on server request ";
    //  }))
  }

  getpostfromlocation(postdata) {

    if (this.userdata.city != null && this.userdata.city !== undefined) {
      if (this.userdata.city.toLowerCase().includes(postdata.location.toLowerCase())) {
        return postdata;
      }
    }

  }
  searchClicked() {
    if (this.searchText === null || this.searchText === undefined) {
      this.jobInfo = true;
      this.searchInfo = false;
    }
    if ((this.searchText === null || this.searchText === undefined) && (this.searchLocation !== null && this.searchLocation !== undefined)) {
      this.searchpage = true;
      this.searchLocation = this.searchLocation.trim();
      this.searchData = this.hrpost.filter((el) => {

        return el.location.toLowerCase().indexOf(this.searchLocation.toLowerCase()) > -1;
      });

    }
    if ((this.searchText !== null && this.searchText !== undefined) && (this.searchLocation === null || this.searchLocation === undefined)) {

      this.searchpage = true;
      this.searchText = this.searchText.trim();
      this.searchData = this.hrpost.filter((el) => {
        return ((el.title.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1) || (el.skills.toString().toLowerCase().indexOf(this.searchText.toLowerCase()) > -1) || (el.companyname.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1));
      });
    }
    if ((this.searchText !== null && this.searchText !== undefined) && (this.searchLocation !== null && this.searchLocation !== undefined)) {
      this.searchpage = true;
      this.searchText = this.searchText.trim();
      this.searchLocation = this.searchLocation.trim();
      this.searchData = this.hrpost.filter((el) => {
        if ((el.location.toLowerCase().indexOf(this.searchLocation.toLowerCase()) > -1) && ((el.title.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1) || (el.skills.toString().toLowerCase().indexOf(this.searchText.toLowerCase()) > -1) || (el.companyname.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1))) {
          return el;
        }
      });
    }


    if (this.searchData !== null && this.searchData !== undefined && this.searchData.length > 0) {
      this.jobInfo = false;
      this.searchInfo = true;
      this.p = 1;
    }
  }
  routeronclicked(hrpost_id) {
    this.router.navigate([hrpost_id], { relativeTo: this.route });
    // this.router.navigateByUrl('user-profile/user-view-post/' + hrpost_id);
    // console.log(hrpost_id);
  }


}

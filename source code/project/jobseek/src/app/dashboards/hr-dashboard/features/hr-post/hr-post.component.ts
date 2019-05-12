import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HrbaseService } from '../../../../_shared/services/hrbase.service';
import { HrPostDetail } from '../../../../_shared/models/hrpostdetails';
import { uuid } from '../../../../_shared/models/uuid';
import { Hrbase } from '../../../../_shared/models/hrbase';

@Component({
  selector: 'app-hr-post',
  templateUrl: './hr-post.component.html',
  styleUrls: []
})
export class HrPostComponent implements OnInit {
  error_text: any;
  id: string;
  hrdata: Hrbase;
  hrpost: HrPostDetail[];
  loadPage: boolean = false;
  loadError: boolean = false;
  constructor(private hrbaseservice: HrbaseService,
    private router: Router) {
      this.id = uuid();
    }

  ngOnInit() {
    this.hrbaseservice.getHrDetailsById(this.id).subscribe((data) => {
      this.hrdata = data;
    });
    this.hrbaseservice.getAllHrPost(this.id, {
      'isHr': true,
      'isApplicant': false
    }).
      subscribe((hrpost: any) => {
        this.hrpost = hrpost;
        console.log('here: ', hrpost);
        this.loadPage = true;
      })

      // .catch((error=>{
      //  this.loadError = true;
      // this.error_text = "Get error on server request ";
      // }))
  }

  public routeronclicked(hrpost_id): void {
    this.router.navigateByUrl('/jobs-posted/' + hrpost_id);
  }
}

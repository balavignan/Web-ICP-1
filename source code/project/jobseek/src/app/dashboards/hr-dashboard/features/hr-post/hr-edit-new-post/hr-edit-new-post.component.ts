import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, ValidatorFn, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { HrbaseService } from '../../../../../_shared/services/hrbase.service';
import { NotificationService } from '../../../../../_shared/services/notification.service';
import { HrPostDetail } from '../../../../../_shared/models/hrpostdetails';
import { uuid } from '../../../../../_shared/models/uuid';
import { Hrbase } from '../../../../../_shared/models/hrbase';
declare var $: any;
@Component({
  selector: 'app-hr-edit-new-post',
  templateUrl: './hr-edit-new-post.component.html',
  styleUrls: []
})
export class HrEditNewPostComponent implements OnInit {
  skillsArray: string[];
  hrdata: Hrbase;
  hrpostNewDataForm: FormGroup;
  id: string;
  popup = {
    isActive: false,
    message: 'this is popup',
    title: 'My Popup',
    stay: 3000
  };

  hrpostNewData: HrPostDetail;
  constructor(private hrbaseservice: HrbaseService,
    private router: Router,
    private _notif: NotificationService
  ) {
    this.hrpostNewData = HrPostDetail.createblank();
    console.log(this.hrpostNewData);
    this.buildFormGroup();
    this.id = uuid();
    this.skillsArray = ['Angular', 'ASP.Net', 'C#', 'C#.Net', 'ADO.Net', 'SQL Server', 'Spring', 'C', 'C++', 'JAVA', 'CSS', 'Graphic Design', 'Ember', 'DataBase', 'PHP', 'Full Stack Developing', 'Testing', 'HTML', 'Javascript', 'NodeJS', 'UI Design', 'Python', 'Rails', 'React', 'Ruby'];
  }

  buildFormGroup(): void {
    const fg = {
      'title': new FormControl(this.hrpostNewData.title, [Validators.required]),
      'description': new FormControl(this.hrpostNewData.description, [Validators.required]),
      'companyname': new FormControl(this.hrpostNewData.companyname, [Validators.required]),
      'startdate': new FormControl(this.hrpostNewData.startdate, [Validators.required]),
      'enddate': new FormControl(this.hrpostNewData.enddate, [Validators.required]),
      'skills': new FormControl(this.hrpostNewData.skills, [Validators.required]),
      'location': new FormControl(this.hrpostNewData.location, [Validators.required]),
      'salary': new FormControl(this.hrpostNewData.salary, [Validators.required]),
      'experinece': new FormControl(this.hrpostNewData.experinece, [Validators.required]),
      'dateOfJoining': new FormControl(this.hrpostNewData.dateOfJoining, [Validators.required]),
      'extraRequirement': new FormControl(this.hrpostNewData.extraRequirement, []),
      'noOfJobOpenings': new FormControl(this.hrpostNewData.noOfJobOpenings, []),
      'CompanyUrl': new FormControl(this.hrpostNewData.CompanyUrl, [Validators.required]),
      'bondDetails': new FormControl(this.hrpostNewData.bondDetails, [Validators.required]),
      'ReportingVenue': new FormControl(this.hrpostNewData.ReportingVenue, [Validators.required]),
      'ResourcePersonContact': new FormControl(this.hrpostNewData.ResourcePersonContact, [Validators.required]),
      'selectionProcedure': new FormControl(this.hrpostNewData.selectionProcedure, [Validators.required]),
    };

    this.hrpostNewDataForm = new FormGroup(fg);

  }
  ngOnInit() {
    $('.dropdown').dropdown({
      label: {
        duration: 0,
      },
      // debug: true,
      performance: true,
    });
    this.hrbaseservice.getHrDetailsById(this.id).subscribe((data) => {
      this.hrdata = data;
    });
  }

  // accept incoming change new notification feature added
  onSubmit() {
    this.hrbaseservice.addNewPost(this.hrpostNewData, this.id, {
      'isHr': true,
      'isApplicant': false
    })
      .subscribe((res) => {
        this._notif.pop(res.message, 'Successfull', 3000);
        if (res.success) {
          this.router.navigateByUrl('hr/jobs-posted');
          console.log( res.message, res.data );
        }
      });
    // this.router.navigate(['hr-post']);
  }

}

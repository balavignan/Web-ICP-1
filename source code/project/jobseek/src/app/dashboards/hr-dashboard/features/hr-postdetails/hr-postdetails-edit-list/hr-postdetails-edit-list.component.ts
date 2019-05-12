import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, ValidatorFn, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HrbaseService } from '../../../../../_shared/services/hrbase.service';
 
declare var $: any;
@Component({
  selector: 'app-hr-postdetails-edit-list',
  templateUrl: './hr-postdetails-edit-list.component.html',
  // styleUrls: ['./hr-postdetails-edit-list.component.css']
})
export class HrPostdetailsEditListComponent implements OnInit {
  skillsArray: string[];
  hrpostNewDataForm: FormGroup;
  id: string;
  @Input()
  hrpost;


@Output()
saveClick = new EventEmitter<boolean>();

  constructor(private hrbaseservice: HrbaseService,
    private router: Router) {
    this.buildFormGroup();
    this.skillsArray = ['Angular', 'ASP.Net', 'C#', 'C#.Net', 'ADO.Net', 'SQL Server', 'Spring', 'C', 'C++', 'JAVA', 'CSS', 'Graphic Design', 'Ember', 'DataBase', 'PHP', 'Full Stack Developing', 'Testing', 'HTML', 'Javascript', 'NodeJS', 'UI Design', 'Python', 'Rails', 'React', 'Ruby'];
  }

  buildFormGroup(): void {
    const fg = {
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'companyname': new FormControl(null, [Validators.required]),
      'startdate': new FormControl(null, [Validators.required]),
      'enddate': new FormControl(null, [Validators.required]),
      'skills': new FormControl(null, [Validators.required]),
      'location': new FormControl(null, [Validators.required]),
      'salary': new FormControl(null, [Validators.required]),
      'experinece': new FormControl(null, [Validators.required]),
      'dateOfJoining': new FormControl(null, [Validators.required]),
      'extraRequirement': new FormControl(null, []),
      'noOfJobOpenings': new FormControl(null, []),
      'CompanyUrl': new FormControl(null, [Validators.required]),
      'bondDetails': new FormControl(null, [Validators.required]),
      'ReportingVenue': new FormControl(null, [Validators.required]),
      'ResourcePersonContact': new FormControl(null, [Validators.required]),
      'selectionProcedure': new FormControl(null, [Validators.required]),
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
    this.id = this.hrpost._id;
  }

  onSubmit() {
    console.log('edit', this.hrpostNewDataForm.value);
    this.hrbaseservice.HrPostUpdate(this.hrpostNewDataForm.value, this.id).
      subscribe(() => {
        this.saveClick.emit(true);
        console.log('success');
      });
    
  }
  discardClicked(){
  window.alert('Your changes will not get updated in our database');
   this.router.navigateByUrl('hr/jobs-posted');
  }
}

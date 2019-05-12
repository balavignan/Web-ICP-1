import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, ValidatorFn, FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { UserBaseService } from '../../../../../_shared/services/user-base.service';
import { ApplicantBase } from '../../../../../_shared/models/applicantbase';
import { uuid } from '../../../../../_shared/models/uuid';
@Component({
  selector: 'app-user-education-add-details',
  templateUrl: './user-education-add-details.component.html',
  // styleUrls: ['./user-education-add-details.component.css']
})
export class UserEducationAddDetailsComponent implements OnInit, OnChanges {


  applicantForm: FormGroup;
  id: string;
  personaldata: any;
  // newEducationDetails: Education;
  yearArray: string[];
  highestDegreeArray1: string[];
  @Input()
  userdata;
  @Input()
  messagec;

  @Output()
  discardClick = new EventEmitter<any>();
  @Output()
  saveClick = new EventEmitter<any>();


  // discardClicked() {
  //   this.discardClick.emit(true);
  // }
  constructor(private _userService: UserBaseService) {
    this.id = uuid();
    this.buildFormGroup();
    this.highestDegreeArray1 = ['B-Tech', 'B.Sc'];
    this.yearArray = ['2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000', '1999', '1998'];
  }
  buildFormGroup(): void {
    const fg = {
      'higherDegreeValue': new FormControl(null, Validators.required),
      'universityName': new FormControl(null, Validators.required),
      'passingYearValue': new FormControl(null, Validators.required),
      'percentageValue': new FormControl(null, Validators.required)
    };


    this.applicantForm = new FormGroup(fg);
  }

  ngOnChanges(changes: SimpleChanges): void {
    alert('fired');
  }

  ngOnInit() {
    this.personaldata = JSON.stringify(this.userdata);
    this.personaldata = JSON.parse(this.personaldata);
  }
  onSubmit() {
     this.userdata.education.push(this.applicantForm.value);
    this._userService.updateUserDetailsById( this.userdata, this.id).
    subscribe(() => {
      this.saveClick.emit(this.userdata);
    });
    this.saveClick.emit(this.personaldata);
  }
  discardClicked() {
    this.discardClick.emit(this.personaldata);
  }
}

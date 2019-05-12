import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, ValidatorFn, FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { UserBaseService } from '../../../../../_shared/services/user-base.service';
import { ApplicantBase } from '../../../../../_shared/models/applicantbase';
import { uuid } from '../../../../../_shared/models/uuid';
import * as citiesData from '../../../../../_shared/data/us-cities.json';
declare var $: any;
@Component({
  selector: 'app-user-personal-details',
  templateUrl: './user-personal-details.component.html',
  styleUrls: []
})
export class UserPersonalDetailsComponent implements OnInit {
 

  cities: any = [];
  states: string[];
  genders: string[];
  id: string;
  temp: any;
  personaldata: ApplicantBase;
  applicantForm: FormGroup;
  @Input()
  userdata;

  @Output()
  discardClick = new EventEmitter();
  @Output()
  saveClick = new EventEmitter();

  discardClicked() {
    // Object.assign(this.userdata, this.temp);
    // this.userdata = this.temp;
    console.log('Discarderd', this.temp);
    this.discardClick.emit(JSON.parse(this.temp));
  }
  constructor(private userbaseservice: UserBaseService) {
    this.states = [
      'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    this.genders = ['Male', 'Female', 'Other'];
    this.cities = citiesData;
    this.buildFormGroup();
    // this.personaldata = this.userdata;
    // this.temp = this.userdata;
    console.log('personalData', JSON.stringify(this.userdata));
    this.id = uuid();
  }

  buildFormGroup(): void {
    const fg = {
      'firstName': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'lastName': new FormControl(null),
      'dob': new FormControl(null, Validators.required),
      'gender': new FormControl(null, Validators.required),
      'phone': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{10}')]),
      'email': new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z\.0-9]+@[A-Za-z]+(.)[A-Za-z]+')]),
      'state': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'country': new FormControl(null, Validators.required),
      'skillValue': new FormControl(null, Validators.required),
    };
    this.applicantForm = new FormGroup(fg);
  }
  ngOnInit() {
    $('.dropdown').dropdown({
      label: {
        duration: 0,
      },
      // debug: true,
      performance: true,
    });
    this.temp = JSON.stringify(this.userdata);
    if(this.userdata!=null && this.userdata!=undefined)
    { this.userdata.dob=this.userdata.dob.replace(/T00:00:00.000Z/,''); 
    }
    console.log('personalDatadwkfnn kdjsnkjwnjk', JSON.stringify(this.temp));
  }

  onsubmit() {
    console.log('update values', this.applicantForm);
    this.userbaseservice.updateUserDetailsById(this.applicantForm.value, this.id).
      subscribe(() => {
        this.saveClick.emit(this.userdata);
        console.log('success');
      });
  }
}

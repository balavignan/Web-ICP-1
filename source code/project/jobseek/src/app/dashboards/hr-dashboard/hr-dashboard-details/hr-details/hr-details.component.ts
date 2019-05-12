import { EventEmitter, Component, OnInit, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HrbaseService } from '../../../../_shared/services/hrbase.service';
import { uuid } from '../../../../_shared/models/uuid';
import * as citiesData from '../../../../_shared/data/us-cities.json';
declare var $:any;
@Component({
  selector: 'app-hr-details',
  templateUrl: './hr-details.component.html',
  styleUrls: []
})
export class HrDetailsComponent implements OnInit {
  temp: any;
  id: string;
  hrdetailForm: FormGroup;
  cities:any={};
  states:any;
@Input()
hrdata;

  @Output()
  discardClick = new EventEmitter();

@Output()
saveClick = new EventEmitter();

  discardClicked() {
    this.discardClick.emit(JSON.parse(this.temp));
  }

  constructor(private hrbaseservice: HrbaseService) {
    this.buildFormGroup();
    this.id = uuid();
    this.cities=citiesData;
    this.states = [
      'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh','Goa', 'Gujarat','Haryana', 'Himachal Pradesh','Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Orissa', 'Punjab', 'Rajasthan', 'Sikkim', 'TamilNadu','Telangana','Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
   ];
  } 

  buildFormGroup(): void {
    const fg = {
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null),
      'email': new FormControl(null, [Validators.required,Validators.pattern('[A-Za-z\.0-9]+@[A-Za-z]+(.)[A-Za-z]+')]),
      'dob':  new FormControl(null, Validators.required),
      'phone':  new FormControl(null, [Validators.required,Validators.pattern('[0-9]{10}')]),
      'industry':  new FormControl(null, Validators.required),
      'country': new FormControl(null, Validators.required),
      'state': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'designation': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'jobProfile': new FormControl(null, Validators.required)
    };

    this.hrdetailForm = new FormGroup(fg);
  }

  ngOnInit() {
    $('.dropdown').dropdown({
      label: {
        duration: 0,
      },
      // debug: true,
      performance: true,
    });
    this.temp = JSON.stringify(this.hrdata);
    if(this.hrdata!=null && this.hrdata!=undefined)
    { this.hrdata.dob=this.hrdata.dob.replace(/T00:00:00.000Z/,''); 
    }
  }

  onSubmit() {
    console.log(this.hrdetailForm);
    console.log('update values', this.hrdetailForm);
    this.hrbaseservice.updateHrDetailsById(this.hrdetailForm.value, this.id).
      subscribe(() => {
      console.log('success');
      });
      this.saveClick.emit(this.hrdata);
  }
}

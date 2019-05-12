import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, ValidatorFn, FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { UserBaseService } from '../../../../../_shared/services/user-base.service';
import { uuid } from '../../../../../_shared/models/uuid';

@Component({
  selector: 'app-user-experience-add-details',
  templateUrl: './user-experience-add-details.component.html',
  styleUrls: []
})
export class UserExperienceAddDetailsComponent implements OnInit {
  personaldata: any;
  id: any;
  applicantForm: FormGroup;
  @Input()
  userdata;

  @Output()
  discardClick = new EventEmitter();
  @Output()
  saveClick = new EventEmitter();
  constructor(private _userService: UserBaseService) {
    this.buildFormGroup();
    this.id = uuid();
  }

  buildFormGroup(): void {
    const fg = {
      'designation': new FormControl(null, Validators.required),
      'totalExperience': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
    };
    this.applicantForm = new FormGroup(fg);
  }

  ngOnInit() {
    this.personaldata  = JSON.stringify(this.userdata);
  this.personaldata=JSON.parse(this.personaldata)
  }
  onSubmit() {
     this.userdata.experience.push(this.applicantForm.value);
    this._userService.updateUserDetailsById( this.userdata, this.id).
    subscribe(() => {
      this.saveClick.emit(this.userdata);
    });
  }
  discardClicked() {
    this.discardClick.emit(this.personaldata);
  }
}

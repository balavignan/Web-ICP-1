import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, ValidatorFn, FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HrbaseService } from '../../../../_shared/services/hrbase.service';
import { Hrbase } from '../../../../_shared/models/hrbase';
import { uuid } from '../../../../_shared/models/uuid';
@Component({
  selector: 'app-hr-experience-add-details',
  templateUrl: './hr-experience-add-details.component.html'
})
export class HrExperienceAddDetailsComponent implements OnInit {
  @Input()
  hrdata;

  personaldata: any;
  id: string;
  applicantForm: FormGroup;

  @Output()
  discardClick = new EventEmitter<any>();
  @Output()
  saveClick = new EventEmitter<any>();

  constructor(private hrbaservice: HrbaseService,
    private router: Router) {
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
    this.buildFormGroup();
    this.personaldata = JSON.stringify(this.hrdata);
    this.personaldata = JSON.parse(this.personaldata);
  }

  async onSubmit() {
    await this.hrdata.experience.push(this.applicantForm.value);
    console.log('values exp', this.hrdata);
    this.hrbaservice.updateHrDetailsById(this.hrdata, this.id).
      subscribe((res) => {
        this.personaldata = res;
        this.saveClick.emit(this.hrdata);
        console.log('experience updated');
      });
    // this.router.navigateByUrl('hr');
  }

  discardClicked() {
    this.discardClick.emit(this.personaldata);
  }
}

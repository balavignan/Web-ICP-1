import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hrbase } from '../../../../_shared/models/hrbase';
import { HrbaseService } from '../../../../_shared/services/hrbase.service';
import { uuid } from '../../../../_shared/models/uuid';
declare var $: any;

@Component({
  selector: 'app-hr-skill',
  templateUrl: './hr-skill.component.html',
  styleUrls: [],
})
export class HrSkillComponent implements OnInit {
  skillsArray: string[];
  hrSkillForm: FormGroup;
  id: string;
  functional: string[];
  personaldata: any;

  @Input()
  hrdata;

  @Output()
  discardClick = new EventEmitter<any>();
  @Output()
  saveClick = new EventEmitter<any>();

  constructor(private hrbaservice: HrbaseService, private router: Router) {
    this.buildFormGroup();
    this.skillsArray = ['Angular', 'CSS', 'Graphic Design', 'Ember', 'HTML',
      'Information Architecture', 'Javascript', 'Mechanical Engineering',
      'Meteor', 'NodeJS', 'UI Design', 'Python', 'Rails', 'React', 'Ruby'];
    this.id = uuid();
  }

  buildFormGroup(): void {
    const fg = {
      'skills': new FormControl(null, Validators.required),
    };
    this.hrSkillForm = new FormGroup(fg);
  }

  ngOnInit() {
    $('.dropdown').dropdown({
      label: {
        duration: 0,
      },
      // debug: true,
      performance: true,
    });
 
    this.personaldata = JSON.stringify(this.hrdata);
    this.personaldata = JSON.parse(this.personaldata);
    // console.log(this.hrdata);

  }

  onSubmit() {
    this.hrdata.skillValue = this.hrSkillForm.value.skills;
    console.log(console.log('new', this.hrSkillForm.value.skills));
    this.hrbaservice.updateHrDetailsById(this.hrdata, this.id).
      subscribe((res) => {
        this.personaldata = res;
        console.log('skills updated');
      });
    this.saveClick.emit(this.hrdata);
  }

  discardClicked() {
    this.discardClick.emit(this.personaldata);
  }
}

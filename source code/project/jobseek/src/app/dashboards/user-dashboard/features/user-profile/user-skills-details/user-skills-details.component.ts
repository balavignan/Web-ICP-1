import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserBaseService } from '../../../../../_shared/services/user-base.service';
import { uuid } from '../../../../../_shared/models/uuid';

declare var $: any;

@Component({
  selector: 'app-user-skills-details',
  templateUrl: './user-skills-details.component.html',
})
export class UserSkillsDetailsComponent implements OnInit {
  skillsArray: string[];
  applicantSkillForm: FormGroup;
  temp: string;
  @Input()
  userdata;

  @Output()
  discardClick = new EventEmitter<boolean>();

  @Output()
  saveClick = new EventEmitter();

  discardClicked() {
    this.discardClick.emit(JSON.parse(this.temp));
  }


  constructor(private _userService: UserBaseService) {
    this.skillsArray = ['Angular', 'ASP.Net', 'C#', 'C#.Net', 'ADO.Net', 'SQL Server', 'Spring', 'C', 'C++', 'JAVA', 'CSS', 'Graphic Design', 'Ember', 'DataBase', 'PHP', 'Full Stack Developing', 'Testing', 'HTML', 'Javascript', 'NodeJS', 'UI Design', 'Python', 'Rails', 'React', 'Ruby'];

    this.buildFormGroup();
   }

   buildFormGroup(): void {
    const fg = {
      'skills': new FormControl(null, Validators.required),
    };
    this.applicantSkillForm = new FormGroup(fg);
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
  }



 updateUserSkill() {
    // console.log(console.log('new', this.applicantSkillForm.value));
    this.userdata.skillValue = this.applicantSkillForm.value.skills;
    console.log('skills are:', JSON.stringify(this.userdata.skillValue));
   this._userService.updateUserDetailsById(this.userdata, uuid()).subscribe(() => {
    this.saveClick.emit(this.userdata);
    console.log('success');
  });
    // this.skillsArray.pop();
  }
}

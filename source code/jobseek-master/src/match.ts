// import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { uuid } from '../../../../_helper/uuid';
// import { HrbaseService } from '../../../../services/hrbase.service';
// import { Router } from '@angular/router';
// import { Hrbase } from '../../../../model/hrbase';
// declare var $: any;

// @Component({
//   selector: 'app-hr-skill',
//   templateUrl: './hr-skill.component.html',
//   styleUrls: [],
// })
// export class HrSkillComponent implements OnInit {
//   skillsArray: string[];
//   hrSkillForm: FormGroup;
//   id: string;
//   functional: string[];
//   personaldata: Hrbase;

//   @Input()
//   hrdata;

//   @Output()
//   discardClick = new EventEmitter<boolean>();
//   @Output()
//   saveClick = new EventEmitter<boolean>();

//   constructor(private hrbaservice: HrbaseService, private router: Router) {
//     this.skillsArray = ['Angular', 'CSS', 'Graphic Design', 'Ember', 'HTML',
//       'Information Architecture', 'Javascript', 'Mechanical Engineering',
//       'Meteor', 'NodeJS', 'UI Design', 'Python', 'Rails', 'React', 'Ruby'];
//     this.buildFormGroup();
//     this.id = uuid();
//   }

//   buildFormGroup(): void {
//     const fg = {
//       'skills': new FormControl(null, Validators.required),
//     };
//     this.hrSkillForm = new FormGroup(fg);
//   }

//   ngOnInit() {
//     $('.dropdown').dropdown({
//       label: {
//         duration: 0,
//       },
//       // debug: true,
//       performance: true,
//     });
//     this.personaldata = this.hrdata;
//   }

//   onSubmit() {
//     console.log(console.log('new', this.hrSkillForm.value));
//     this.hrbaservice.updateHrSkillsById(this.hrSkillForm.value, this.id).
//       then((res) => {
//         // this.personaldata = res;
//         console.log('skills updated');
//       });
//       this.saveClick.emit(true);
//   }

//   discardClicked() {
//     this.discardClick.emit(true);
//   }
// }

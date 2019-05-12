import { Component, OnInit, SimpleChange } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { UserBaseService } from '../../../../_shared/services/user-base.service';
import { NotificationService } from '../../../../_shared/services/notification.service';
import { QuotesService } from '../../../../_shared/services/quotes.service';
import { ApplicantBase } from '../../../../_shared/models/applicantbase';
import { uuid } from '../../../../_shared/models/uuid';
import { environment } from '../../../../../environments/environment';


declare var $: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  skillsArray: string[];
  expAdd: boolean;
  educationAdd: boolean;
  id: any;
  meme: number;
  meme1: boolean;
  // `c_${num}`: boolean;
  userdata: ApplicantBase;
  educationOpen: boolean;
  educationMain: boolean;
  skillOpen: boolean;
  skillActive = false;
  skillMain: boolean;
  bindings: { foo: '<' };
  expOpen: boolean;
  expMain: boolean;
  detailsOpen: boolean;
  detailsMain: boolean;
  profile_photo_for_viewing: string;
  isMale = false;
  isFemale = false;
  otherGender = false;
  qod = 'quote of the day.';
  highestDegreeArray: any;
  yearArray: any;
  message = 'abhishek';

  // c_0 = true;
  // c_1 = true;
  // c_2 = true;
  // c_3 = true;
  // c_4 = true;

  constructor(private userbaseservice: UserBaseService,
    private _notif: NotificationService,
    private ng2ImgMax: Ng2ImgMaxService,
    private _qod: QuotesService
  ) {
    // $('#chagecheck').change(this.sayHello());
    this.skillsArray = ['Angular', 'CSS', 'Graphic Design', 'Ember', 'HTML',
      'Information Architecture', 'Javascript', 'Mechanical Engineering',
      'Meteor', 'NodeJS', 'UI Design', 'Python', 'Rails', 'React', 'Ruby'];

    this.detailsMain = true;
    this.detailsOpen = false;
    this.expMain = true;
    this.expOpen = false;
    this.expAdd = false;
    this.skillMain = true;
    this.skillOpen = false;
    this.educationMain = true;
    this.educationOpen = false;
    this.educationAdd = false;
    this.id = uuid();
    this.highestDegreeArray = ['B-Tech', 'B.Sc'];
    this.yearArray = ['2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000', '1999', '1998'];
    this.meme1 = false;
  }
  ngOnInit() {
    this.getdata();
    this.accordionClicked();
    this._qod.getQOD().then(q => {
      this.qod = q;
    });
    $('.ui.modal')
      .modal()
      ;




    $('.dropdown').dropdown({
      label: {
        duration: 0,
      },
      debug: true,
      performance: true,
    });


  }

  getdata() {
    this.userbaseservice.getUserDetailsById(this.id).
      subscribe((userdata) => {
        console.log('maindata', userdata);
        this.userdata = userdata;
        this.profile_photo_for_viewing = this.getUrl();
        this.isMale = this.userdata.gender.toLowerCase() === 'male';
        this.isFemale = this.userdata.gender.toLowerCase() === 'female';
        this.otherGender = this.userdata.gender.toLowerCase() === 'other';
      });
  }
  accordionClicked() {
    $('.ui.accordion')
      .accordion({
        collapsible: false
      });
    $('.ui.selection.dropdown').dropdown();
    $('#select')
      .dropdown()
      ;
  }

  EditPersonalDetails() {
    alert('dsjssbck');
    this.detailsOpen = true;
  }
  closeDetails(event) {
    this.userdata = event;
    console.log('in discard', JSON.stringify(event));
    this.isMale = this.userdata.gender.toLowerCase() === 'male';
    this.isFemale = this.userdata.gender.toLowerCase() === 'female';
    this.otherGender = this.userdata.gender.toLowerCase() === 'other';

    this.detailsOpen = false;
    this.detailsMain = true;
  }
  AddExperienceMore(): void {
    this.expAdd = true;
  }
  closeAddExp(event) {
    this.userdata = event;
    // this.getdata()
    this.expAdd = false;
  }
  EditSkillsDetails() {
    this.skillMain = false;
    this.skillOpen = true;
  }
  closeSkill(event) {
    this.userdata = event;
    this.skillMain = true;
    this.skillOpen = false;
  }

  AddEducationMore(): void {
    this.educationAdd = true;
  }


  closeAddEducation(event) {
    this.userdata = event;
    this.educationAdd = false;
  }

  getUrl() {
    console.log('fd', this.userdata);
    return `url(${environment.USER_SERVER}/images/${this.userdata ? this.userdata.profile_photo : 'skj'})`;
    // return `url()`;/
    // return "url('http://estringsoftware.com/wp-content/uploads/2017/07/estring-header-lowsat.jpg')";
  }

  updateProfilePicture(files) {
    const file = files[0];
    if (!file || file.size > 202400000) {
      this._notif.pop('Please Select an Image\n or file size is greater then 2mb', 'Wrong Input!', 3000);
    }
    this.ng2ImgMax.resizeImage(file, 250, 250).subscribe(resImg => {
      this.ng2ImgMax.compressImage(resImg, 1.00).subscribe(async (finalImg) => {
        const result = await this.userbaseservice.updateProfilePicture(this.userdata, { 'profile_photo': finalImg });
        this.userdata.profile_photo = result.data;
        this.profile_photo_for_viewing = this.getUrl();
        this._notif.pop(result.message, 'New Profile Pic', 3000);
      });
    });
  }

  async deleteExperience(pos: number) {
    // this.userdata.experience = this.userdata.experience.filter( el => el !== this.userdata.experience[pos]);
    this.userdata.experience.splice(pos, 1);
    console.log(pos, JSON.stringify(this.userdata.experience));
    await this.userbaseservice.updateUserDetailsById(this.userdata, this.id);
    this._notif.pop('Successfully Deleted Experience.', 'Great!', 2000);
  }

  async deleteEducation(pos: number) {
    // this.userdata.experience = this.userdata.experience.filter( el => el !== this.userdata.experience[pos]);
    this.userdata.education.splice(pos, 1);
    console.log(pos, JSON.stringify(this.userdata.education));
    await this.userbaseservice.updateUserDetailsById(this.userdata, this.id);
    this._notif.pop('Successfully Deleted Education.', 'Great!', 2000);
  }

  async editData(pos: any, type: string) {
    // c = `c_${pos}`;
    // this.c = !this.c;
    if (type.toLowerCase() === 'edit') {
      this.meme = pos;
      this.meme1 = true;
    } else if (type.toLowerCase() === 'save') {
      this.meme = -1;
      this.meme1 = false;
      await this.userbaseservice.updateUserDetailsById(this.userdata, this.id);
      this._notif.pop('Updated New Education Details', 'Updated', 2000);
    }
    console.log('lglvlmddknvoslvkdnlknvl:: ', pos, type);
    // pos = false;
    // console.log('lglvlmddknvoslvkdnlknvl:: ', pos);

  }

  // activateClass(subModule) {
  //   subModule.active = !subModule.active;
  // }
}

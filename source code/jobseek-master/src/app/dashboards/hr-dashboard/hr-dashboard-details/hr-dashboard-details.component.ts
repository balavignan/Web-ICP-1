import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { async } from '@angular/core/testing';
import { UserBaseService } from '../../../_shared/services/user-base.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { NotificationService } from '../../../_shared/services/notification.service';
import { HrbaseService } from '../../../_shared/services/hrbase.service';
import { Hrbase } from '../../../_shared/models/hrbase';
import { uuid } from '../../../_shared/models/uuid';
import { QuotesService } from '../../../_shared/services/quotes.service';
import { environment } from '../../../../environments/environment';

declare var $: any;
@Component({
  selector: 'app-hr-dashboard-details',
  templateUrl: './hr-dashboard-details.component.html',
  styleUrls: ['./hr-dashboard-details.component.css']
})
export class HrDashboardDetailsComponent implements OnInit {
  expAdd: boolean;
  hrdata: any;
  id: string;
  meme: number;
  meme1: boolean;
  ExpOpen: boolean;
  skillActive = false;
  expMain: boolean;
  ContactMain: boolean;
  ContactOpen: boolean;
  detailsOpen: boolean;
  jobOpen: boolean;
  SkillsOpen: boolean;
  isAuthenticated: boolean;
  detailsMain: boolean;
  SkillsMain: boolean;
  uploadImageActive: boolean;
  profile_photo_for_viewing: string;
  isMale = false;
  isFemale = false;
  otherGender = false;
  qod = 'Qoute Of the Day';

  constructor(private router: Router,
    private _authService: AuthService,
    private _userService: UserBaseService,
    private _notif: NotificationService,
    private ng2ImgMax: Ng2ImgMaxService,
    private hrbaseservice: HrbaseService,
    private _qod: QuotesService
  ) {
    this.expMain = true;
    this.ExpOpen = false;
    this.detailsMain = true;
    this.detailsOpen = false;
    this.jobOpen = false;
    this.SkillsOpen = false;
    this.SkillsMain = true;
    this.ContactMain = true;
    this.ContactOpen = false;
    this.uploadImageActive = false;
    this.expAdd = false;
    this.id = uuid();
    this.meme1 = false;
  }

  ngOnInit() {
    // console.log('from hr: ', this._authService.isLoggedIn());
    // if (!this._authService.isLoggedIn()) {
    //   this.router.navigateByUrl('login');
    // }
    this.accordionClicked();
    this._qod.getQOD().then(q => {
      this.qod = q;
    });
    if (!this._authService.isLoggedIn) {
      this.router.navigateByUrl('login');
    }
    this.hrbaseservice.getHrDetailsById(this.id).subscribe((data) => {
      this.hrdata = data;
      console.log('hr data', this.hrdata);
      // if (this.hrdata.profile_photo) {
        this.profile_photo_for_viewing = this.getUrl();
        // this.isMale = this.hrdata.gender.toLowerCase() === 'male';
        // this.isFemale = this.hrdata.gender.toLowerCase() === 'female';
        // this.otherGender = this.hrdata.gender.toLowerCase() === 'other';
      // }
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
    this.detailsOpen = true;
    this.detailsMain = false;
  }
  closeDetails(event) {
    console.log('as', event);
    this.hrdata = event;
    // this.isMale = this.hrdata.gender.toLowerCase() === 'male';
    // this.isFemale = this.hrdata.gender.toLowerCase() === 'female';
    // this.otherGender = this.hrdata.gender.toLowerCase() === 'other';
    this.detailsOpen = false;
    this.detailsMain = true;
  }

  EditSkills() {
    this.SkillsMain = false;
    this.SkillsOpen = true;
  }
  closeSkills() {
    this.SkillsMain = true;
    this.SkillsOpen = false;
  }
  EditContactDetails() {
    this.ContactMain = false;
    this.ContactOpen = true;
  }
  closecontact() {
    this.ContactMain = true;
    this.ContactOpen = false;
  }
  AddExperienceMore() {
    // console.log("sdd");
    this.expAdd = true;
  }
  EditExpDetails() {
    this.expMain = false;
    this.ExpOpen = true;
  }
  closeexp(event) {
    this.hrdata = event;
    this.expMain = true;
    this.ExpOpen = false;
  }
  closeAddExp() {
    this.expAdd = false;
  }
  // abhishek code

  logoutClicked() {
    console.log('log out clicked');
    this._authService.logout();
  }

  uploadImageClicked() {
    // console.log(event);
    this.uploadImageActive = !this.uploadImageActive;
    console.log('dscs', this.uploadImageActive);
  }

  getUrl() {
    console.log('fd', this.hrdata);
    if (this.hrdata.profile_photo) {
      return `url(${ environment.USER_SERVER }/images/${this.hrdata ? this.hrdata.profile_photo : 'skj'})`;
    }
    // return `url()`;/
    console.log('inside geturl');
    return 'url(\'http://estringsoftware.com/wp-content/uploads/2017/07/estring-header-lowsat.jpg\')';
  }

  updateProfilePicture(files) {
    const file = files[0];

    if (!file || file.size > 202400000) {
      this._notif.pop('Please Select an Image\n or file size is greater then 2mb', 'Wrong Input!', 3000);
    }
    this.ng2ImgMax.resizeImage(file, 250, 250).subscribe(resImg => {
      this.ng2ImgMax.compressImage(resImg, 1.00).subscribe(async (finalImg) => {
        console.log('file is : ', this.hrdata);
        const result = await this._userService.updateProfilePicture(this.hrdata, { 'profile_photo': finalImg });
        this.hrdata.profile_photo = result.data;
        this.profile_photo_for_viewing = this.getUrl();
        this._notif.pop(result.message, 'New Profile Pic', 3000);
      });
    });
  }

  async deleteExperience(pos: number) {
    // this.hrdata.experience = this.hrdata.experience.filter( el => el !== this.hrdata.experience[pos]);
    this.hrdata.experience.splice(pos, 1);
    console.log(pos, JSON.stringify(this.hrdata.experience));
    await this.hrbaseservice.updateHrDetailsById(this.hrdata, this.id);
    this._notif.pop('Successfully Deleted Experience.', 'Great!', 2000);
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
      await this.hrbaseservice.updateHrDetailsById(this.hrdata, this.id);
      this._notif.pop('Updated New Education Details', 'Updated', 2000);
    }
    console.log('lglvlmddknvoslvkdnlknvl:: ', pos, type);
    // pos = false;
    // console.log('lglvlmddknvoslvkdnlknvl:: ', pos);

  }
  // uploadImageClicked1(event) {
  //   // console.log(event);
  //   this.uploadImageActive = event;
  //   console.log('dscs', this.uploadImageActive);
  // }
}

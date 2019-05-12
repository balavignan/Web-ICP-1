import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../../_shared/services/auth.service';
import { uuid } from '../../../_shared/models/uuid';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserBaseService } from '../../../_shared/services/user-base.service';

declare var $: any;
@Component({
  selector: 'app-hr-header',
  templateUrl: './hr-header.component.html',
  styles: ['./hr-header.component.css']
})
export class HrHeaderComponent implements OnInit {

  @Input()
  hrdata;

  password: string;
  compareValue: string;
  id: string;
  inputType = 'password';
  currentForm: FormGroup;
  isActive: boolean[];
  constructor(
    private _authService: AuthService,
    private router: Router,
    private userbase: UserBaseService
  ) {
    this.isActive = [true, false, false];
    // this.id =
    if (!_authService.isLoggedIn) {
      this.router.navigateByUrl('login');
    }
    this.id = uuid();
    this.buildFormGroup();
  }

  buildFormGroup(): void {
    const fg = {
      currentPassword: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{5,}$')]),
      newPassword: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{5,}$')]),
      confirmPassword: new FormControl(null, [Validators.required]),
    }
    this.currentForm = new FormGroup(fg);
  }
  ngOnInit() {

    $(document).ready(function () {
      $('.ui.dropdown').dropdown();
    });
  }
  changePassword() {
    $('.small.modal')
      .modal({
        closable: true,
        onDeny: function () {
          return true;
        }
      })
      .modal('show');
    console.log('request to change password', this.currentForm.value);
    this.userbase.checkCurrentPassword(this.currentForm.value, this.id).subscribe((data) => {
      console.log('data', data)
      if (data.status) {
        $('.small.modal').modal('toggle');
        this.logoutClicked();
      }
      else {
        window.alert(data.errors.message);
        this.buildFormGroup();
      }
    })
  }

  tooglepwd() {
    if (this.inputType === 'password') {
      this.inputType = 'text';
    } else if (this.inputType === 'text') {
      this.inputType = 'password';
    }
  }

  getprofile() {
    this.isActive = [true, false, false];
    this.router.navigateByUrl('hr/profile');
  }
  getpost() {
    this.isActive = [false, true, false];
    this.router.navigateByUrl('hr/jobs-posted');
  }
  addnewpost() {
    this.isActive = [false, false, true];
    this.router.navigateByUrl('hr/new-job');
  }

  getDetails() {
    if (!this._authService.isLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    this.router.navigateByUrl('hr/profile');
    // console.log( this._authService. )
  }

  logoutClicked() {
    console.log('log out clicked');
    this._authService.logout();
    this.router.navigateByUrl('login');
  }
}

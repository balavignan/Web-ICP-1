import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserBaseService } from '../../services/user-base.service';
import { uuid } from '../../models/uuid';

declare var $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  // this.currentForm.value, this.id
  @Output()
  closeChangePassword = new EventEmitter<boolean>();
  id: string;
  inputType = 'password';
  password: any;
  compareValue: any;
  public currentForm: FormGroup;

  constructor(
    private router: Router,
    private _authService: AuthService, private userbase: UserBaseService, private route: ActivatedRoute
  ) {
    this.id = uuid();
    this.buildFormGroup();
  }

  ngOnInit() {
    // $(document).ready(function () {
    //   $('.ui.dropdown').dropdown();
    // });

      this.changePassword();
  }

  tooglepwd() {
    if (this.inputType === 'password') {
      this.inputType = 'text';
    } else if (this.inputType === 'text') {
      this.inputType = 'password';
    }
  }

  buildFormGroup(): void {
    const fg = {
      currentPassword: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{5,}$')]),
      newPassword: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{5,}$')]),
      confirmPassword: new FormControl(null, [Validators.required]),
    };
    this.currentForm = new FormGroup(fg);
  }

  changePassword() {
    console.log('request to change password', this.currentForm.value);
    this.userbase.checkCurrentPassword(this.currentForm.value, this.id).subscribe((data) => {
      console.log('data', data);
      if (data.status) {
        $('.small.modal').modal({
          closable: true,
          onDeny: function () {
            return true;
          }
        }).modal('toggle');
        this.logoutClicked();
      } else {
        window.alert(data.errors.message);
        this.buildFormGroup();
      }
    });
  }

  logoutClicked() {
    this._authService.logout();
    this.router.navigateByUrl('login');
  }

  closeChangePasswordClicked() {
    console.log('clicked');
    $('.small.modal')
    .modal({
      closable  : false,
      onDeny    : function() {
        return true;
      }
    })
    .modal('hide');
    this.closeChangePassword.emit(false);
  }
}

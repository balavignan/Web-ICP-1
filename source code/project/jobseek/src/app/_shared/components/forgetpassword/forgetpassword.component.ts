import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { promise } from 'protractor';
import { Router } from '@angular/router';
import { ApplicantBase } from '../../models/applicantbase';
import { UserBaseService } from '../../services/user-base.service';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  loginEmailForm: FormGroup;
  resetForm: FormGroup;
  UserEmail: string;
  forgetInfo: Boolean = true;
  resetInfo: Boolean = false;
  inputType = 'password';
  user_details: ApplicantBase;

  constructor(private fb: FormBuilder, private _userbase: UserBaseService, private router: Router) {
    this.user_details = ApplicantBase.createblank();
    this.loginEmailForm = fb.group({
      userEmail: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z\.0-9]+@[A-Za-z]+(.)[A-Za-z]+')]),
      isHr: new FormControl(false, Validators.required)
    });
    this.resetForm = fb.group({
      password: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{5,}$')]),
      confirmPassword: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
  }
  tooglepwd() {
    if (this.inputType === 'password') {
      this.inputType = 'text';
    } else if (this.inputType === 'text') {
      this.inputType = 'password';
    }
  }
  resetPassword() { 
    console.log('form value',this.loginEmailForm.value);
    this.forgetInfo = false;
    this._userbase.checkMailId(this.loginEmailForm.value).subscribe((res) => {
      console.log('id exists', res);
      if (res.status) {
        this.resetInfo = true;
      } else {
        window.alert('Email address was not registered with us Please Signup');
        this.router.navigateByUrl('signin');
      }
    });
  }
  onSubmit() {
    this._userbase.passwordUpdate(this.loginEmailForm.value, this.resetForm.value.password)
      .subscribe((res) => {
        console.log('password updated successfully',res);
        this.router.navigateByUrl('login');
      });
  }

}

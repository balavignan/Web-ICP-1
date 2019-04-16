import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ApiService} from '../api.service';

@Component({
  selector: 'user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      Name: [null, Validators.required],
      UName: [null, Validators.required],
      UPassword: [null, Validators.required],
      dob: [null, Validators.required],
      email: [null, Validators.required],
      gender: ['F', Validators.required],
    });

  }
  get f() {
    return this.userForm.controls;
  }

  // getter for form fields


  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    let user: object = {};
    user['userID'] = 18;
    user['name'] = this.userForm.value.Name;
    user['gender'] = this.userForm.value.gender;
    user['birthday'] = this.userForm.value.dob;
    user['contact'] = this.userForm.value.email;
    user['username'] = this.userForm.value.UName;
    user['user_password'] = this.userForm.value.UPassword;
    user['email'] = this.userForm.value.email;

    this.api.postUser(user)
      .subscribe(res => {

        this.router.navigate(['/user-profile', res._id]);

      }, (err) => {
        console.log(err);
      });
  }



}

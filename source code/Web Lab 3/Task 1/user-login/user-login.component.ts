import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../api.service";
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  title = 'app';
  user = {};
  UserForm: FormGroup;
  submitted = false;
  login_error=false;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router,private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.UserForm = this.formBuilder.group({
      UName: [null, Validators.required],
      UPassword: [null, Validators.required],
    });

  }
  get f() {
    return this.UserForm.controls;
  }
  onSubmit()
  {
    this.submitted = true;
    if(this.UserForm.invalid)
    {
      //document.getElementById("error_div").style.display="none";
      return;
    }
    this.api.ValidateUser(this.UserForm.value.UName,this.UserForm.value.UPassword).subscribe(data => {
      if(data.length>0){
      this.router.navigate(['/user-profile',data[0]._id]);}
      else {
        this.login_error=true;
        //document.getElementById("error_div").style.display="";
      }

    },(err)=>{

      console.log("error in login page")});
  }
  onSignUp()
  {
    this.router.navigate(['/user-add']);
  }


}

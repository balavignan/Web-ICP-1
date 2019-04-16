import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    userForm: FormGroup;
    submitted = false;

  user = {};
  user_id ;


  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router,private formBuilder: FormBuilder) {
      this.userForm = new FormGroup({
          Name: new FormControl(),
          UName: new FormControl(),
          UPassword: new FormControl(),
          dob: new FormControl(),
          email: new FormControl(),
          gender: new FormControl()

      });
  }

  ngOnInit() {

      this.user_id= this.route.snapshot.params['id'];
      document.getElementById("save").style.display="none";
    this.getUser(this.user_id);



  }
    get f() {
        return this.userForm.controls;
    }

    getUser(id) {
    this.api.getUser(id)
      .subscribe(data => {
        this.user = data;
          this.userForm = this.formBuilder.group({
              Name: [this.user['name'], Validators.required],
              UName: [this.user['username'], Validators.required],
              UPassword: [this.user['user_password'], Validators.required],
              dob: [this.user['birthday'], Validators.required],
              email: [this.user['email'], Validators.required],
              gender: [this.user['gender'], Validators.required],
          });
          let f = document.getElementsByClassName("ro");
          for(let i=0,fLen=f.length;i<fLen;i++){
              f[i].setAttribute("readonly", "true");//As @oldergod noted, the "O" must be upper case
          }
          f = document.getElementsByClassName("dis");
          for(let i=0,fLen=f.length;i<fLen;i++){
              f[i].setAttribute("disabled", "true");
          }
      });
  }

  onDelete() {
    this.api.deleteUser(this.user_id)
      .subscribe(res => {
          this.router.navigate(['']);
        }, (err) => {
          console.log(err);
        }
      );
  }
    onEdit()
    {
        let f = document.getElementsByClassName("ro");
        for(let i=0,fLen=f.length;i<fLen;i++){
            f[i].removeAttribute("readonly");
        }
        f = document.getElementsByClassName("dis");
        for(let i=0,fLen=f.length;i<fLen;i++){
            f[i].removeAttribute("disabled");
        }
        document.getElementById("save").style.display="";
        document.getElementById("edit").style.display="none";
    }
    onSave()
    {
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
        this.api.updateUser(this.user_id,user)
            .subscribe(res => {
                this.submitted = false;
                let f = document.getElementsByClassName("ro");
                console.log(f)
                for(let i=0,fLen=f.length;i<fLen;i++){
                    console.log(f[i]);
                    f[i].setAttribute("readonly", "true");
                }
                 f = document.getElementsByClassName("dis");
                for(let i=0,fLen=f.length;i<fLen;i++){
                    f[i].setAttribute("disabled", "true");
                }
                document.getElementById("save").style.display="none";
                document.getElementById("edit").style.display="";

            }, (err) => {
                console.log(err);
            });
        document.getElementById("message").style.display="";
        setTimeout(function () {
            document.getElementById("message").style.display="none";

        },5000);


    }

}

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../_shared/services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserBaseService } from '../../../_shared/services/user-base.service';
import { uuid } from '../../../_shared/models/uuid';

declare var $: any;
@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {


  id: string;
  passwordChangeRequest = false;
  invitesOpen = false;
  @Input()
  userdata;

  public resetInfo: Boolean = false;
  constructor(private router: Router,
    private _authService: AuthService, private userbase: UserBaseService, private route: ActivatedRoute) {
    this.id = uuid();
  }


  ngOnInit() {
    $(document).ready(function () {
      $('.ui.dropdown').dropdown();
    });
  }
  getprofile() {
    this.router.navigateByUrl('/user-profile');
  }
  getJob() {

    this.router.navigate(['user-view-post'], { relativeTo: this.route.parent });
  }
  // this.currentForm.value, this.id
  logoutClicked() {
    this._authService.logout();
    this.router.navigateByUrl('login');
  }
  getAppliedJob() {

    this.router.navigateByUrl('/user-profile/applied-job');
    // this.router.navigate(['/applied-job'], {relativeTo: this.route});
  }

  changePassword(str) {
    $('.small.modal')
      .modal({
        closable: true,
        onDeny: function () {
          return true;
        }
      })
      .modal('show');
    if (str === 'changePassword') {
      this.passwordChangeRequest = true;
      this.invitesOpen = false;
    } else if (str === 'checkInvites') {
      this.passwordChangeRequest = false;
      this.invitesOpen = true;
    }
  }
}

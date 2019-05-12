import { Component, OnInit, Input } from '@angular/core';
// import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';
import { AuthService } from '../../_shared/services/auth.service';


@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: []
})
export class HrDashboardComponent implements OnInit {

  @Input()
hrdata;
  id: string;
  isActive: boolean[];

  constructor(
    private _authService: AuthService,
    private router: Router
  ) {
    this.isActive = [true, false, false];
    // this.id =
    if (!_authService.isLoggedIn) {
      this.router.navigateByUrl('login');
    }
    console.log('lopkln', this.hrdata, '\n');
  }

  ngOnInit() {
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

  // logoutClicked() {
  //   console.log('log out clicked');
  //   this._authService.logout();
  //   this.router.navigateByUrl('login');
  // }
}

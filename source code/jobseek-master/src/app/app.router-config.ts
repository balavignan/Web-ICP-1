import { Routes } from '@angular/router';
import { LoginComponent } from './_shared/components/login/login.component';
import { CallbackComponent } from './_shared/components/misc/callback/callback.component';


import { SignupHomeComponent } from './_shared/components/signup/signup-home/signup-home.component';
import { SignupComponent } from './_shared/components/signup/signup.component';
import { HrComponent } from './_shared/components/signup/hr/hr.component';
import { ApplicantComponent } from './_shared/components/signup/applicant/applicant.component';
import { NotificationComponent } from './_shared/components/misc/notification/notification.component';
import { ForgetpasswordComponent } from './_shared/components/forgetpassword/forgetpassword.component';
import { LoggedInGuard } from './core/guards/logged-in.guard';
import { HomePageComponent } from './_shared/components/home-page/home-page.component';




export const routerConfig: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'user-profile',
    loadChildren: './dashboards/user-dashboard/user-dashboard.module#UserDashboardModule'
  },
  // hr routes
  {
    path: 'applicant',
    canActivate: [LoggedInGuard && localStorage['isApplicant']],
    redirectTo: 'user-view-post'
  },
  {
    path: 'signin',
    component: SignupHomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
   },
  // signup routes during
  {
    path: 'signin',
    component: SignupComponent,
    children: [
      {
        path: 'signin-hr',
        component: HrComponent,
        // canActivate: [LoggedInGuard]
      },
      {
        path: 'signin-applicant',
        component: ApplicantComponent,
        // canActivate: [LoggedInGuard]
      }
    ]
  },
  { path: 'notif', component: NotificationComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'forgetPassword', component: ForgetpasswordComponent }
];

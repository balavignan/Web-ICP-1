import { Routes } from '@angular/router';
import { HrPostComponent } from './features/hr-post/hr-post.component';
import { HrPostdetailsComponent } from './features/hr-postdetails/hr-postdetails.component';
import { HrEditNewPostComponent } from './features/hr-post/hr-edit-new-post/hr-edit-new-post.component';
import { HrDashboardDetailsComponent } from './hr-dashboard-details/hr-dashboard-details.component';
import { HrDashboardComponent } from './hr-dashboard.component';
import { CallbackComponent } from '../../_shared/components/misc/callback/callback.component';
import { HrManageApplicantComponent } from './features/hr-postdetails/hr-manage-applicant/hr-manage-applicant.component';

export const hrRouterConfig: Routes = [
    { path: 'hr', redirectTo: 'hr/profile' }, //
    // hr home page
  {
    path: 'jobs-posted/:id',
    component: HrPostdetailsComponent
  },
  {
    path: 'jobs-posted/:id/manageApplicant',
    component: HrManageApplicantComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'hr', component: HrDashboardComponent, children: [
      {
        path: 'profile',
        component: HrDashboardDetailsComponent
      },
      {
        path: 'new-job',
        component: HrEditNewPostComponent
      },
      {
        path: 'jobs-posted',
        component: HrPostComponent,
        children: [
          {
            path: ':id',
            component: HrPostdetailsComponent,
          }
        ]
      }
    ]
  },
  // hr routes
];

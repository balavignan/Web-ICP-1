import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SelectModule } from 'ng2-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { HrDashboardComponent } from './hr-dashboard.component';
import { HrPostComponent } from './features/hr-post/hr-post.component';
import { HrEditNewPostComponent } from './features/hr-post/hr-edit-new-post/hr-edit-new-post.component';
import { HrPostListSummaryComponent } from './features/hr-post/hr-post-list-summary/hr-post-list-summary.component';
import { HrManageApplicantListComponent } from './features/hr-postdetails/hr-manage-applicant/hr-manage-applicant-list/hr-manage-applicant-list.component';
import { HrManageApplicantListDetailsComponent } from './features/hr-postdetails/hr-manage-applicant/hr-manage-applicant-list-details/hr-manage-applicant-list-details.component';
import { HrManageApplicantComponent } from './features/hr-postdetails/hr-manage-applicant/hr-manage-applicant.component';
import { HrPostdetailsEditListComponent } from './features/hr-postdetails/hr-postdetails-edit-list/hr-postdetails-edit-list.component';
import { HrPostdetailsSummaryComponent } from './features/hr-postdetails/hr-postdetails-summary/hr-postdetails-summary.component';
import { HrPostdetailsComponent } from './features/hr-postdetails/hr-postdetails.component';
import { HrDashboardDetailsComponent } from './hr-dashboard-details/hr-dashboard-details.component';
import { HrDetailsComponent } from './hr-dashboard-details/hr-details/hr-details.component';
import { HrExperienceAddDetailsComponent } from './hr-dashboard-details/hr-experience-add-details/hr-experience-add-details.component';
import { HrHeaderComponent } from './hr-header/hr-header.component';
import { HrSkillComponent } from './hr-dashboard-details/hr-skill/hr-skill.component';
// import { UserExperienceAddDetailsComponent } from './user-dashboard/features/user-profile/user-experience-add-details/user-experience-add-details.component';
import { ChatModule } from '../../_shared/components/chat/chat.module';
import { StrinCleaner } from '../../_shared/pipes/stringCleaner';
import { hrRouterConfig } from './hr-dashboard.router-config';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    SelectModule,
    FormsModule,
    ReactiveFormsModule,
    ChatModule,
    HttpModule,
    Ng2ImgMaxModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot(hrRouterConfig),
    BrowserModule
  ],
  declarations: [
    HrDashboardComponent,
    HrPostComponent,
    HrEditNewPostComponent,
    HrPostListSummaryComponent,
    HrManageApplicantListComponent,
    HrManageApplicantListDetailsComponent,
    HrManageApplicantComponent,
    HrPostdetailsEditListComponent,
    HrPostdetailsSummaryComponent,
    HrPostdetailsComponent,
    HrDashboardDetailsComponent,
    HrDetailsComponent,
    HrExperienceAddDetailsComponent,
    HrSkillComponent,
    HrHeaderComponent,
    StrinCleaner
  ]
})
export class HrDashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserModule } from '@angular/platform-browser';
import { SelectModule } from 'ng2-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { UserEducationAddDetailsComponent } from './features/user-profile/user-education-add-details/user-education-add-details.component';
import { UserExperienceAddDetailsComponent } from './features/user-profile/user-experience-add-details/user-experience-add-details.component';
import { UserPersonalDetailsComponent } from './features/user-profile/user-personal-details/user-personal-details.component';
import { UserSkillsDetailsComponent } from './features/user-profile/user-skills-details/user-skills-details.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { UserViewComponent } from './features/user-view/user-view.component';
import { UserViewAppliedPostComponent } from './features/user-view-applied-post/user-view-applied-post.component';
import { UserViewPostDeatilssummaryComponent } from './features/user-view-post/user-view-post-details/user-view-post-deatilssummary/user-view-post-deatilssummary.component';
import { UserViewPostComponent } from './features/user-view-post/user-view-post.component';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { UserViewPostDetailsComponent } from './features/user-view-post/user-view-post-details/user-view-post-details.component';
import { ChatComponent } from '../../_shared/components/chat/chat.component';
import { UserViewAppliedPostDetailsComponent } from './features/user-view-applied-post/user-view-applied-post-details/user-view-applied-post-details.component';
import { ChatModule } from '../../_shared/components/chat/chat.module';
import { userRouterConfig } from './user-dashboard.router-config';
import { StatisticsComponent } from '../../_shared/components/statistics/statistics.component';
import { NumberToWordsPipe } from '../../_shared/pipes/numberToWords.pipe';
import { SharedModule } from '../../_shared/shared.module';
// import { UserEducationDetailsComponent } from './features/user-profile/user-education-details/user-education-details.component';




@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    // BrowserAnimationsModule,
    // BrowserModule,
    SelectModule,
    FormsModule,
    ReactiveFormsModule,
    ChatModule,
    HttpModule,
    Ng2ImgMaxModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forChild(userRouterConfig)
  ],
  declarations: [
    // NumberToWordsPipe,
    UserEducationAddDetailsComponent,
    StatisticsComponent,
    UserExperienceAddDetailsComponent,
    UserPersonalDetailsComponent,
    UserSkillsDetailsComponent,
    UserProfileComponent,
    UserViewComponent,
    UserViewAppliedPostComponent,
    UserViewPostComponent,
    UserViewPostDeatilssummaryComponent,
    UserViewPostDetailsComponent,
    UserHeaderComponent,
    UserViewAppliedPostDetailsComponent,
    UserDashboardComponent
  ],
  exports: [
    UserViewAppliedPostDetailsComponent,
    UserEducationAddDetailsComponent,
    UserExperienceAddDetailsComponent,
    UserPersonalDetailsComponent,
    UserSkillsDetailsComponent,
    UserProfileComponent,
    UserViewComponent,
    UserViewAppliedPostComponent,
    UserViewPostComponent,
    UserViewPostDeatilssummaryComponent,
    UserViewPostDetailsComponent,
    UserHeaderComponent,
    UserDashboardComponent,
    UserEducationAddDetailsComponent,
    RouterModule
  ]
})
export class UserDashboardModule { }

// import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import {ToasterModule, ToasterService} from '@angular2-toaster';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AppComponent } from './app.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { routerConfig } from './app.router-config';


import { SelectModule } from 'ng2-select';
import { UserBaseService } from './_shared/services/user-base.service';
import { HrbaseService } from './_shared/services/hrbase.service';
import { NotificationService } from './_shared/services/notification.service';
import { DataService } from './_shared/services/data.service';
import { AuthService } from './_shared/services/auth.service';
import { QuotesService } from './_shared/services/quotes.service';
import { LoginComponent } from './_shared/components/login/login.component';
import { SignupComponent } from './_shared/components/signup/signup.component';
import { HrComponent } from './_shared/components/signup/hr/hr.component';
import { ApplicantComponent } from './_shared/components/signup/applicant/applicant.component';
import { CallbackComponent } from './_shared/components/misc/callback/callback.component';
import { NotificationComponent } from './_shared/components/misc/notification/notification.component';
import { SignupHomeComponent } from './_shared/components/signup/signup-home/signup-home.component';
import { JwtService } from './_shared/services/jwt.service';
import { ForgetpasswordComponent } from './_shared/components/forgetpassword/forgetpassword.component';
import { ChatModule } from './_shared/components/chat/chat.module';
import { LoggedInGuard } from './core/guards/logged-in.guard';
// import { UserDashboardModule } from './dashboards/user-dashboard/user-dashboard.module';
import { HrDashboardModule } from './dashboards/hr-dashboard/hr-dashboard.module';
import { StatisticsComponent } from './_shared/components/statistics/statistics.component';
import { SharedModule } from './_shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HrComponent,
    ApplicantComponent,
    CallbackComponent,
    CallbackComponent,
    NotificationComponent,
    ForgetpasswordComponent,
    SignupHomeComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    // ToasterModule.forRoot(),
    // BrowserModule,
    SelectModule,
    FormsModule,
    SharedModule,
    NgbModule,
    // RouterModule,
    // Routes,
    ReactiveFormsModule,
    HttpModule,
    ChatModule,
    // UserDashboardModule,
    HrDashboardModule,
    Ng2ImgMaxModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot(routerConfig),
    // BrowserModule,
    FormsModule, AngularFontAwesomeModule, FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
  ],
  providers: [
    UserBaseService,
    HrbaseService,
    LoggedInGuard,
    NotificationService,
    DataService,
    AuthService,
    JwtService,
    QuotesService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

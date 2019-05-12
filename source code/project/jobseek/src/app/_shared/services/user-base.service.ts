import { Injectable } from '@angular/core';
import 'rxjs/operator/toPromise';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { environment } from '../../../environments/environment';
import { ApplicantBase } from '../models/applicantbase';
import { HrPostDetail } from '../models/hrpostdetails';
import { ApiServiceService } from './api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserBaseService extends ApiServiceService {

  constructor(private http: Http) {
    super();
  }

  checkMailId(checkDetails: any): Observable<any> {
    const emailDetails = {
      email: checkDetails.userEmail,
      isHr: checkDetails.isHr
    };
    return this.http.post(environment.USER_SERVER + `/api/checkMailId`, emailDetails, this.post()).map((res) => {
      const data = res.json();
      return data || {};
    }).catch((error: any) => {
      return new ErrorObservable(error.error);
    });
  }
  checkCurrentPassword(value: any, id: string): Observable<any> {
    const obj = {
      id: id,
      currentPassword: value.currentPassword,
      newPassword: value.newPassword
    };
    return this.http.post(environment.USER_SERVER + `/api/changePassword`, obj, this.post())
      .map((res) => {
        const data = res.json();
        return data || {};
      }).catch((error: any) => {
        return new ErrorObservable(error.error);
      });
  }

  passwordUpdate(emailDetails: any, password: any): Observable<boolean> {
    const personalDetails = {
      email: emailDetails.userEmail,
      isHr: emailDetails.isHr,
      password: password
    };
    return this.http.post(environment.USER_SERVER + `/api/resetPassword`, personalDetails, this.post())
      .map((res) => {
        const data = res.json();
        return data || {};
      }).catch((error: any) => {
        return new ErrorObservable(error.error);
      });
  }

  addNewUser(userDetail: any, files: {}): Promise<boolean> {
    return this.http.post(environment.USER_SERVER + `/api/hr`, userDetail)
      .toPromise()
      .then(async (response) => {
        const final_data = response.json().data as any;
        console.log(final_data);
        this.updateProfilePicture(final_data, files);
        return final_data;
      });
  }


  getUserDetailsById(user: string): Observable<ApplicantBase> {
    return this.http.get(`${environment.USER_SERVER}/api/users`, {
      params: {
        'id': user
      }
    }).map((res) => {
      console.log('res data ', res);
      const data = res.json();
      return data || {};
    }).catch((error: any) => {
      return new ErrorObservable(error.error);
    });

  }

  getUserApplyPost(user: string): Observable<HrPostDetail[]> {
    console.log('user_id', user);
    return this.http.get(`${environment.USER_SERVER}/api/users/appliedposts`, {
      params: {
        'id': user
      }
    }).map((res) => {
      const data = res.json();
      return data || {};
    }).catch((error: any) => {
      return new ErrorObservable(error.error);
    });
  }

  updateUserDetailsById(updateDetails: any, user: string): Observable<ApplicantBase> {
    return this.http.put(`${environment.USER_SERVER}/api/users/update`, updateDetails, {
      params: {
        'id': user
      }
    }).map((res) => {
      const data = res.json();
      return data || {};
    }).catch((error: any) => {
      return new ErrorObservable(error.error);
    });
  }

  updateUserApplyPost(postid: string, userid: string): Observable<Boolean> {
    console.log('post_id u', postid);
    console.log('user_id u', userid);
    return this.http.put(`${environment.USER_SERVER}/api/users/apply`, {}, {
      params: {
        'id': postid,
        'hrRef': userid
      }
    }).map((res) => {
      console.log('re data', res);
      const data = res.json();
      return data || {};
    }).catch((error: any) => {
      return new ErrorObservable(error.error);
    });
  }

  async updateProfilePicture(final_data: any, files: any) {
    console.log('respoonse is : ', final_data, files);
    const formData: FormData = new FormData();
    // console.log(' 123 : ', response);
    // if (files['profile_photo']) {
    const file: File = files['profile_photo'];
    // formData.append('profile_photo', file, file.name);
    // }
    console.log('AAAAA', file);
    const d = formData.append('profile_photo', file, file.name);
    // return Http.call('POST', `${environment.USER_SERVER}/api/user/upload-profile`, {formData});
    const image_response = await this.http.post(`${environment.USER_SERVER}/api/user/upload-profile`, formData, {
      params: {
        id: final_data._id,
        isHr: Boolean(final_data.isHr),
        isApplicant: final_data.isApplicant
      }
    }).toPromise();
    console.log('lml: ', image_response.json());
    return image_response.json();
  }

}

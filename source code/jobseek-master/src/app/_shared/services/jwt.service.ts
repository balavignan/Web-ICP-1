import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class JwtService {

  status: any;


  constructor() {
  }

  getToken(status): any {
    if (status.isHr) {
      return window.localStorage['id_token_hr'];
    } else if (status.isApplicant) {
      return window.localStorage['id_token_applicant'];
    }
  }

  saveToken(token: any) {
    // console.log('ddd', window.localStorage['id_token']);
    if (token.isHr) {
      window.localStorage['id_token_hr'] = token.token;
    } else if (token.isApplicant) {
      window.localStorage['id_token_applicant'] = token.token;
    }
  }

  destroyToken(status) {
    if (status.isHr) {
      window.localStorage.removeItem('id_status_hr');
    } else if (status.isApplicant) {
      window.localStorage.removeItem('id_token_applicant');
    }
  }


}

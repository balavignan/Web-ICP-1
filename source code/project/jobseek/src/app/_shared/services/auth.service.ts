import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { shareReplay } from 'rxjs/operator/shareReplay';
import * as moment from 'moment';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/shareReplay';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { JwtService } from './jwt.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


const USER_SERVER = 'http://localhost:3000';
@Injectable()
export class AuthService {

  private userStatus = new BehaviorSubject<any>({});
  public userStatusIs = this.userStatus.asObservable().pipe();
  status = {
    'isHr': false,
      'isApplicant': false
  };

  constructor(
    private http: HttpClient,
    private jwtservice: JwtService
  ) { }

  populate() {
    if (this.jwtservice.getToken(this.status)) {

    }
  }

  login(formData): Observable<any> {
    console.log('inside', formData);
    return this.http.post(
      USER_SERVER + '/api/login', formData)
      .catch(error => {
        console.log('message is: ', error.error.errors);
        return Observable.throw(error.error.errors);
      })
      .do((res: Response) => {
        // if (res.errors) {
        // return;
        // }
        console.log('response is: ');
        console.log('response is: ', res);
        if (res.status) {
          return res;
        }
        return this.setSession(res);
      })
      .shareReplay();
  }

  private setSession(authResult) {
    console.log(' authResult is : ');
    console.log(' authResult is : ', authResult.user);
    // const expiresAt = moment().add(authResult.expiresIn, 'second');
    // if (authResult.user.id) {
    window.localStorage['uuid'] = authResult.user.id;
    // if (authResult.user.isHr) {
    //   window.localStorage['isHr'] = authResult.user.isHr;
    // }
    // if (authResult.user.isApplicant) {
    //   window.localStorage['isApplicant'] = authResult.user.isApplicant;
    // }
    // }
    this.status = {
      'isHr': authResult.user.isHr,
      'isApplicant': authResult.user.isApplicant
    };

    this.userStatus.next(this.status);

    this.jwtservice.saveToken(authResult.user);
    return {
      status: authResult.user.status,
      isHr: authResult.user.isHr,
      isApplicant: authResult.user.isApplicant
    };
    // localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    console.log(window.localStorage['uuid']);
    this.jwtservice.destroyToken(this.status);
    localStorage.clear();
    localStorage.removeItem('uuid');
    // localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    console.log('you got this : ', this.jwtservice.getToken(this.status));
    if (this.jwtservice.getToken(this.status) && this.jwtservice.getToken(this.status).length) {
      return true;
    }
    return false;
    // return moment().isBefore(this.getExpiration());
  }

  // getExpiration() {
  //   const expiration = localStorage.getItem('expires_at');
  //   const expiresAt = JSON.parse(expiration);
  //   return moment(expiresAt);
  // }
}

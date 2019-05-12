import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { environment } from '../../../environments/environment';
import { JwtService } from './jwt.service';
import { RequestOptions, Headers } from '@angular/http';


@Injectable()
export class ApiServiceService {

  headers: any;

  constructor(
  ) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
  }
  // protected formatErrors(error: any) {
  // return new ErrorObservable(error.error);
  // }

  // get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
  // return this.http.get(`${environment.USER_SERVER}${path}`, {
  // params
  // })
  // .pipe(catchError(this.formatErrors));
  // }

  // put(path: string, body: Object = {}): Observable<any> {
  // return this.http.put(
  // `${environment.USER_SERVER}${path}`,
  // JSON.stringify(body)
  // ).pipe(catchError(this.formatErrors));
  // }

  // post(path: string, body: Object = {}): Observable<any> {
  // return this.http.post(
  // `${environment.USER_SERVER}${path}`,
  // JSON.stringify(body)
  // ).pipe(catchError(this.formatErrors));
  // }

  // delete(path): Observable<any> {
  // return this.http.delete(
  // `${environment.USER_SERVER}${path}`
  // ).pipe(catchError(this.formatErrors));
  // }

  protected post() {
    return new RequestOptions({ headers: this.headers, method: 'post' });
  }

  protected get() {
    return new RequestOptions({ headers: this.headers });
  }

  protected put() {

    return new RequestOptions({ headers: this.headers, method: 'put' });
  }

  protected patch() {
    return new RequestOptions({ headers: this.headers, method: 'patch' });
  }

}
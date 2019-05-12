import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

    private obj = new BehaviorSubject<any>({});
    currentMessage = this.obj.asObservable();

    constructor() { }

    changeMessage(message: {}) {
        this.obj.next(message);
    }
}

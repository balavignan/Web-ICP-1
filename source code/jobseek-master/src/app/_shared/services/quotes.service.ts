import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class QuotesService {
    quoteOfTheDay: any;
    constructor(private http: Http) {
    }
    getQOD() {
        return fetch('http://quotes.rest/qod.json').then( (res) => res.json()).then( d => {
            console.log('dataaaaaaaaaa\n\n', d.contents.quotes[0].quote);
            return d.contents.quotes[0].quote;
        });
        // this.quoteOfTheDay = data;
        // console.log(this.quoteOfTheDay.contents.quotes[0].quote);
    }
}

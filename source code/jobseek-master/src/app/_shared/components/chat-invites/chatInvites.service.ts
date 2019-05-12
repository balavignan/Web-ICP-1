import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
// import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import { ApiService } from './api.service';

interface MessageTemplate {
    user: String; room: any; message: String; sender: any; receiver: any;
}

@Injectable()

export class ChatInvitesService {
    socket = io('http://localhost:5000');
    oldMessage() {
        const observable = new Observable<MessageTemplate[]>(observer => {
            this.socket.on('load old msgs', (data) => {
                console.log(data);
                observer.next(data);
            });
            return () => { this.socket.disconnect(); };
        });
        return observable;
    }

}

import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { environment } from '../../../../environments/environment';
import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';


interface MessageTemplate {
    user: String; room: any; message: String; messages: String[]; sender: any; receiver: any; created: Date;
}

@Injectable()

export class ChatService {
    socket = io('http://localhost:5000');
    constructor(public http: Http) { }
    public joinRoom(userStatus: any, value: any) {
        console.log(' data: ', userStatus);
        if (userStatus.isApplicant) {
            value['userType'] = 'applicant';
        } else if (userStatus.isHr) {
            value['userType'] = 'hr';
        }
        return this.http.post(`${environment.USER_SERVER}/join`, value)
            .toPromise()
            .then((res) => {
                // console.log(res);
                const res1 = res.json();
                console.log(res1);

                // console.log('messagesss', res1.data[0]._from);
                let messages = [];
                if (!res1 || !res1.data[0] || !res1.data[0]._from) {

                } else {
                    messages = Array.of(...res1.data[0]._from.messages, ...res1.data[0]._to.messages);
                    console.log('mixed array is : ', messages);
                }
                console.log('messagesss Inside Chat Service', messages, res1);
                if (!res1.data || res1.data.length === 0 || !messages || messages.length === 0) {
                    console.log('len 0');

                    return { messages: 'nothing', flag: false, fromId: null };
                } else {
                    this.socket.emit('join', value);
                    return { messages: messages, flag: true, fromId: res1.data[0]._from._id};
                }
                // const temp = res1.data;
                // // Object.assign(messages, )
                // console.log(temp);

            }).catch(err => {
                console.log('err is: ', err);
            });
    }

    checkInvites(senderInfo) {
        console.log('Inside Check Invites', senderInfo);
        return this.http.post(`${environment.USER_SERVER}/enter/invites`, { senderInfo })
            .toPromise()
            .then((res) => {
                const res1 = res.json();
                console.log(res1.data);
                return res1.data;
            }).catch(err => {
                console.log('err is: ', err);
            });
    }
    toggel(id) {
        console.log(id);
        return this.http.put(`${environment.USER_SERVER}/enter/accept/invites`, { id })
            .toPromise()
            .then((res) => {
                const res1 = res.json();
                return res1;
            }).catch(err => {
                console.log('err is: ', err);
            });
    }
    leaveRoom(data) {
        this.socket.emit('leave', data);
    }

    sendInvite(value) {
        console.log('Inside send Invite of chat Service ', value);
        this.socket.emit('sendInvite',
            value);
    }

    userLeftRoom() {
        const observable = new Observable<{
            user: String, room: any,
            message: String, messages: String[], sender: any, receiver: any, created: Date
        }>(observer => {
            this.socket.on('left room', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); };
        });
        return observable;
    }
    sendMessage(data) {
        data.created = new Date();
        this.socket.emit('message', data);
    }

    newMessageRecieved() {
        const observable = new Observable<{
            user: String, room: any,
            message: String, messages: String[], sender: any, receiver: any, created: Date
        }>(observer => {
            this.socket.on('new message', (data) => {
                console.log('fetched from database', data);
                observer.next(data);
            });
            return () => { this.socket.disconnect(); };
        });
        return observable;
    }
    oldMessage() {
        const observable = new Observable<MessageTemplate[]>(observer => {
            this.socket.on('load old msgs', (data) => {
                console.log('Old messages', data);
                observer.next(data);
            });
            return () => { this.socket.disconnect(); };
        });
        return observable;
    }
    sendInvitation() {
        const observable = new Observable<{
            user: String, room: any, message: String,
            messages: String[], sender: any, receiver: any
        }>(observer => {
            this.socket.on('send-invitation', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); };
        });
        return observable;
    }
}

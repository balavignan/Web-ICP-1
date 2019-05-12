import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ChatService } from './chat.service';
import { map } from 'rxjs/operators';
declare var $: any;


interface MessageTemplate {
  user: String; room: any; message: String; messages: String[]; sender: any; receiver: any; created: Date;
}


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {

  @Input()
  initiator: any; // hr
  // @Input()
  // userStatus: any; // hr
  @Input()
  recepient: any; // applicant

  @Output()
  expandClick = new EventEmitter<any>();

  formId: String;

  // @Output()
  // OnCreate = new EventEmitter<any>();
  expandClass: any;
  socket: any;
  user: string;
  // room: string;
  sender: any;
  receiver: any;
  room: any;
  messageText: string;
  chatWindow: boolean;
  sendInviteButton: boolean;
  chatInvitesButton: boolean;
  messageArray: Array<MessageTemplate> = [];
  messageArray1: any;
  x: boolean;

  constructor(public _chatService: ChatService) {
    this.chatInvitesButton = true;
    this.chatWindow = false;
    this.sendInviteButton = false;
    this._chatService.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));

    this._chatService.newMessageRecieved()
      .subscribe((data) => {
        this.messageArray.push(data);
        setTimeout(() => {
          $('#chatBox').scrollTop($('#chatBox')[0].scrollHeight);
        }, 100);
      });
    this._chatService.oldMessage()
      .subscribe((data) => {
        console.log('Data', data);
        this.messageArray = data;
      });
    this._chatService.sendInvitation()
      .subscribe(data => {
        this.messageArray.push(<MessageTemplate>data);
      });
  }

  ngOnInit() {
    //  this.socket = io('http://localhost:5000');
    // this.OnCreate.emit(new Date());/
    this.expandClass = { 'expand': true, 'braille': false };
    this.x = false;
    this.sender = this.initiator ? this.initiator.email : 'NAN';
    this.receiver = this.recepient ? this.recepient.email : 'NAN';
    console.log('val', this.sender, this.receiver);
    this.join();
  }


  // In case there is record of previous chat found join the same conversation

  join() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    console.log('jnsnj', this.initiator, this.recepient);

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.room = text;
    this._chatService.joinRoom(this.initiator, {
      user: this.user, room: this.room,
      sender: this.sender, receiver: this.receiver, chatWindow: false
    }).
      then((res: any) => {
        console.log('Inside .............', res.flag);
        this.formId = res.fromId;
        this.chatWindow = res.flag;
        this.sendInviteButton = !res.flag;
        console.log(res.messages);
        // this.runmyFunc(res.messages);
        if (res.flag) {
          this.messageArray1 = res.messages.sort((a, b) => {
            console.log(' a:  ', a.created, ' b: ', b.created, ' :: ', a.created > b.created, ' for ', a.message, ' and ', b.message);
            return new Date(a.created) > new Date(b.created) ? 1 : new Date(a.created) < new Date(b.created) ? -1 : 0;
            // return new Date(a.created) > new Date(b.created) ? true : false;
          });
          setTimeout(() => {
            $('#chatBox').scrollTop($('#chatBox')[0].scrollHeight);
          }, 100);
          console.log('message array is ', this.messageArray1);
        }

        //  this.messageArray = res.messages;
        // for(let i=0 ; i<len; i++){
        //   this.messageArray.push(res.messages[i])
        // }
        // console.log(this.sendInvite);
      });
  }

  // send a new invite to chat message to a new person
  sendInvite() {
    console.log('Inside Chat Component', this.initiator, this.recepient);
    this._chatService.sendInvite({
      user: this.sender, room: this.room, sender: this.sender,
      receiver: this.receiver
    });
    this.sendInviteButton = false;
    this.chatWindow = true;
  }
  // User Leaving the conversation room
  leave() {
    this._chatService.leaveRoom({ user: this.user, sender: this.sender, receiver: this.receiver });
  }

  // Send New Message
  sendMessage() {
    this._chatService.sendMessage({ user: this.user, message: this.messageText, sender: this.sender, receiver: this.receiver, fromId: this.formId });
    this.messageText = '';
  }
  sortByDateAsc(lhs, rhs) { return lhs > rhs ? 1 : lhs < rhs ? -1 : 0; }

  sortByDateDesc(lhs, rhs) { return lhs < rhs ? 1 : lhs > rhs ? -1 : 0; }

  getDayAndTime(date) {
    const DateEnum = {
      days: {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
      },
      months: {
        0: 'JAN',
        1: 'FEB',
        2: 'MAR',
        3: 'APR',
        4: 'MAY',
        5: 'JUN',
        6: 'JUL',
        7: 'AUG',
        8: 'SEP',
        9: 'OCT',
        10: 'NOV',
        11: 'DEC',
      }
    };
    const d = new Date();
    date = new Date(date);
    // console.log('todays date is ', d.getDay(), ' ', date.getDate(), ' year ', date.getFullYear());
    if (d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear()) {
      // console.log('second is : ', d.getTime());
      if ((d.getTime() - 2000) <= date.getTime()) {
        return 'Now';
      }
      return 'Today';
    } else if (d.getDate() - date.getDate() === 1 && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear()) {
      return 'Yesterday';
    } else {
      // return 'hello';
      return `${((date.getMonth() === d.getMonth() && d.getFullYear() === date.getFullYear()) ? 'Earlier This Month' : DateEnum.months[date.getMonth()]) + ' ' + date.getFullYear() + ' on ' + DateEnum.days[date.getDay()]}`;
    }
  }

  // runmyFunc(x) {
  //   x = x.map(p => Date.parse(p.created));
  //   console.log('dates array is : ', x.sort());
  // }

  expandClicked() {
    this.expandClick.emit(this.x);
    this.x = !this.x;
    console.log('expand clicked');
    this.expandClass = this.expandClass.expand ? { 'expand': false, 'braille': true } : { 'expand': true, 'braille': false };
  }

}

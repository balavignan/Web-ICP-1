import { Component, OnInit, Input } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

import { ChatComponent } from '../chat/chat.component';
import { ChatService } from '../chat/chat.service';

interface MessageTemplate {
  user: String; room: any; message: String; sender: any; receiver: any;
}
interface StatusTemplate {
  _id: String; status: Boolean;
}

@Component({
  selector: 'app-chat-invites',
  templateUrl: './chat-invites.component.html'
})


export class ChatInvitesComponent implements OnInit {

  @Input()
  email: string;

  user: string;
  // room: string;
  sender: any;
  room: any;
  messageText: string;
  result: boolean;
  show: boolean;
 //  updateStatus: Array<StatusTemplate> = [];
 _id: Array<String> = [];
 status: Array<Boolean> = [];
  noOfChatInvites:  Array<string> = [];
  ngOnInit() {
    console.log('On the initiation of chatInvite component');
    this.enter();
  }
  constructor( public _chatService: ChatService) {
this.result = false;
this.show = false;
  }
 enter() {
   this.sender = this.email;
   this.noOfChatInvites.length = 0;
   this._chatService.checkInvites(this.sender).
   then((res) => {
     for ( let i = 0; i < res.length; i++) {
        this.noOfChatInvites.push(res[i].message);
        this._id.push(res[i]._id);
     }
  });
   this.result = true;
 }
 accept(index) {
   console.log(index);
   this._chatService.toggel(index).
   then((res) => {
     console.log(res);
   // this.router.navigate([/ChatComponent]);
     });
 }
 decline(index, i) {
   // console.log(i);
 // console.log("Decline se pehle",this.noOfChatInvites);
  this._chatService.toggel(index).
  then((res) => {
    console.log(res);
    });
    this.noOfChatInvites.splice(i, 1);
  //  console.log("Decline k Baad",this.noOfChatInvites);
    // this.result = false;
    // this.show = false;
 }
 chatInvites() {
   this.show = true;
 }
}

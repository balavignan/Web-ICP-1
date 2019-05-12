import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';
// import { ChatResolve } from './chat-resolve.service';
import { ChatService } from './chat.service';
import { ChatInvitesService } from '../chat-invites/chatInvites.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ChatInvitesComponent } from '../chat-invites/chat-invites.component';
import { CommonModule } from '@angular/common';

const chatRoutes: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'chat',
        component: ChatComponent,
        // resolve: {
        //     article: ChatResolve
        // }
    },
    {
        path: 'chat-invites',
        component: ChatInvitesComponent
    }
]);

@NgModule({
    declarations: [
        ChatComponent,
        ChatInvitesComponent
    ],
    imports: [
        chatRoutes,
        FormsModule,
        CommonModule,
        // BrowserModule,
        HttpModule
    ],
    exports: [
        ChatComponent,
        ChatInvitesComponent
    ],
    providers: [
        // ChatResolve,
        ChatService,
        ChatInvitesService
    ]
})

export class ChatModule { }

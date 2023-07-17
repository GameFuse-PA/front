import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { MessageModel } from '../../../../models/message.model';
import { ConversationModel } from '../../../../models/conversation.model';
import { User } from '../../../../models/user.model';
import { ProfilService } from '../../../../services/profil/profil.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { FormControl } from '@angular/forms';
import { MessageToBackModel } from '../../../../models/messageToBack.model';
import { SocketService } from '../../../call/services/socket.service';
@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnChanges {
    @Input() socketService: SocketService | undefined;
    @Input() conversation: ConversationModel | undefined;
    me: User | null | undefined;
    @ViewChild('chatContainer') chatContainer: ElementRef | undefined;

    messageControl = new FormControl();
    constructor(
        private profilService: ProfilService,
        private authService: AuthService,
        private datePipe: DatePipe,
    ) {}

    ngOnInit(): void {
        this.scrollToNewMessage();
        this.me = this.authService.user;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['conversation'] && changes['conversation'].currentValue) {
            this.conversation = changes['conversation'].currentValue;
            this.scrollToNewMessage();
        }
    }

    public dateAdapter(messageDate: Date | undefined) {
        try {
            return this.datePipe.transform(messageDate, 'dd/MM/yyyy HH:mm');
        } catch (e) {
            console.log('erreur lors du parsing de date : ' + messageDate);
            return;
        }
    }

    //I send a message so I get the string content and make Chat object to send
    public addMessage(message: string): void {
        if (this.authService.user) {
            let chat: MessageModel = {
                content: message,
                from: this.authService.user,
                date: new Date(),
                conversationId: this.conversation?._id,
            };
            this.profilService.postMessage(chat);

            if (this.conversation?.messages) {
                this.conversation?.messages.push(chat);
                this.scrollToNewMessage();
            }
            this.scrollToNewMessage();
        }
        this.sendToWebSocket(message);
        this.scrollToNewMessage();
    }

    async sendToWebSocket(message: string) {
        if (this.conversation?.users != undefined && this.socketService != undefined) {
            let recipient = undefined;
            if (this.me?._id === this.conversation?.users[0]._id) {
                recipient = this.conversation?.users[1];
            } else {
                recipient = this.conversation?.users[0];
            }
            const chatToBack: MessageToBackModel = {
                content: message,
                to: recipient._id,
            };
            this.socketService.sendChat(chatToBack);
        }
    }

    public scrollToNewMessage(): void {
        setTimeout(() => {
            if (this.chatContainer && this.chatContainer.nativeElement) {
                const containerElement = this.chatContainer.nativeElement;
                const lastMessageElement = containerElement.lastElementChild;
                if (lastMessageElement) {
                    lastMessageElement.scrollIntoView();
                }
            }
        }, 200);
    }
}

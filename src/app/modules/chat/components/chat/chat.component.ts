import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { SocketService } from 'src/app/modules/call/services/socket.service';
import { MessageModel } from '../../../../models/message.model';
import { ConversationModel } from '../../../../models/conversation.model';
import { User } from '../../../../models/user.model';
import { ProfilService } from '../../../../services/profil/profil.service';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnChanges {
    @Input() conversation: ConversationModel | undefined;
    @Output() public whenSubmitMessage = new EventEmitter<string>();
    me: User | null | undefined;

    constructor(private profilService: ProfilService, private authService: AuthService) {}

    ngOnInit(): void {
        this.scrollToNewMessage();
        this.me = this.authService.user
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['conversation'] && changes['conversation'].currentValue) {
            this.conversation = changes['conversation'].currentValue;
            this.scrollToNewMessage();
        }
    }

    //I send a message so I get the string content and make Chat object to send
    public addMessage(message: string): void {
        console.log('add message');
        if (this.authService.user) {
            let date = new Date();

            let chat: MessageModel = {
                content: message,
                from: this.authService.user,
                date: date.getTime(),
                conversationId: this.conversation?._id,
            };
            this.profilService.postMessage(chat);

            if (this.conversation?.messages) {
                this.conversation?.messages.push(chat);
                this.scrollToNewMessage();
            }
        }
        this.whenSubmitMessage.emit(message.trim());
    }

    private scrollToNewMessage(): void {
        setTimeout(() => {
            if (this.conversation?.messages) {
                const lastMessage = document.getElementById(
                    `${this.conversation?.messages.length - 1}`,
                );
                if (lastMessage) {
                    lastMessage.scrollIntoView();
                }
            }
        }, 200);
    }

    public copyLinkInClipBoard() {
        navigator.clipboard.writeText(window.location.href);
        const notification = document.getElementById('notification');
        if (notification) {
            notification.classList.remove('hidden');
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 3000);
        }
    }
}

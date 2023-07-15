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

import { MessageModel } from '../../../../models/message.model';
import { ConversationModel } from '../../../../models/conversation.model';
import { User } from '../../../../models/user.model';
import { ProfilService } from '../../../../services/profil/profil.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { FormControl } from '@angular/forms';
@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnChanges {
    @Input() conversation: ConversationModel | undefined;
    @Output() public whenSubmitMessage = new EventEmitter<string>();
    me: User | null | undefined;

    @ViewChild('chatContainer') chatContainer: ElementRef | undefined;

    messageControl = new FormControl();
    constructor(private profilService: ProfilService, private authService: AuthService) {}

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

    public convertDateFromNumberToFront(numberDate: number | undefined) {
        if (numberDate != undefined) {
            const date = new Date(numberDate);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            return `${day}/${month}/${year} ${hours}:${minutes}`;
        }
        return;
    }

    //I send a message so I get the string content and make Chat object to send
    public addMessage(message: string): void {
        console.log(this.conversation);
        console.log('jajoute un msg');
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
            this.scrollToNewMessage();
        }
        // @ts-ignore
        this.whenSubmitMessage.emit(message.trim());
        this.scrollToNewMessage();
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

    protected readonly console = console;
}

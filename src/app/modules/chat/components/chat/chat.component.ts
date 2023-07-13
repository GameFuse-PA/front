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
import { format } from 'date-fns';

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

    @ViewChild('chatContainer') chatContainer: ElementRef | undefined;

    constructor(private profilService: ProfilService, private authService: AuthService) {}

    ngOnInit(): void {
        this.scrollToNewMessage();
        this.me = this.authService.user;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['conversation'] && changes['conversation'].currentValue) {
            this.conversation = changes['conversation'].currentValue;
            this.scrollToNewMessage();
            console.log("date du msg ")
            // @ts-ignore
          console.log(convertDateFromNumberToFront(this.conversation?.messages[0].createdAt))
          // @ts-ignore
          console.log(this.conversation?.messages[0].from)
          // @ts-ignore
          console.log(this.conversation?.messages[0].conversationId)
          // @ts-ignore
          console.log(this.conversation?.messages[0].content)
        }
    }

    public convertDateFromNumberToFront(numberDate: number) {
        if (numberDate != undefined) {
            const date = new Date(
                Math.floor(numberDate / 10000),
                (Math.floor(numberDate / 100) % 100) - 1,
                numberDate % 100,
                Math.floor(numberDate / 1000000),
                Math.floor(numberDate / 10000) % 100,
            );
            return format(date, 'dd/MM/yyyy HH:mm');
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

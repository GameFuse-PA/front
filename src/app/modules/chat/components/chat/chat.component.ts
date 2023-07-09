import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SocketService } from 'src/app/modules/call/services/socket.service';
import { MessageModel } from '../../../../models/message.model';
import { ConversationModel } from '../../../../models/conversation.model';
import { User } from '../../../../models/user.model';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnChanges {
    @Input() conversation: ConversationModel | undefined;
    @Input() me: User | undefined;
    constructor(private socketService: SocketService) {}

    ngOnInit(): void {
        this.handleNewMessage();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['conversation'] && changes['conversation'].currentValue) {
            this.conversation = changes['conversation'].currentValue;
        }
      console.log('ça a changé : ' + this.conversation?.users);
    }

    handleNewMessage(): void {
        this.socketService.newMessage.subscribe((chat) => {
            if (chat) {
                if (this.conversation?.messages !== undefined) {
                    this.conversation?.messages.push(chat);
                    this.scrollToNewMessage();
                } else {
                    this.conversation = {
                        messages: [],
                    };
                    this.conversation.messages?.push(chat);
                }
            }
        });
    }

    //I send a message so I get the string content and make Chat object to send
    public addMessage(message: string): void {
      console.log("add message")
        let userName;
        if (localStorage.getItem('user') !== null) {
            // @ts-ignore
            userName = JSON.parse(localStorage.getItem('user')).username;
        }
        let date = new Date();
        let chat: MessageModel = {
            content: message,
            from: userName,
            date: date.getTime(),
        };
        this.socketService.sendChat(chat);
        if (this.conversation?.messages) {
            this.conversation?.messages.push(chat);
            this.scrollToNewMessage();
        }
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

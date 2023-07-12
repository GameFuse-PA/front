import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SocketService } from 'src/app/modules/call/services/socket.service';
import { MessageModel } from '../../../../models/message.model';
import { ConversationModel } from '../../../../models/conversation.model';
import { User } from '../../../../models/user.model';
import { ProfilService } from '../../../../services/profil/profil.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnChanges {
    @Input() conversation: ConversationModel | undefined;
    @Input() me: User | undefined;
    @Input() socketService: SocketService | undefined;

    constructor(private profilService: ProfilService) {}

    ngOnInit(): void {
        this.handleNewMessage();
        this.scrollToNewMessage();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['conversation'] && changes['conversation'].currentValue) {
            this.conversation = changes['conversation'].currentValue;
        }

      if(this.conversation?.messages){
        console.log(this.conversation?.messages[1])
        /*for(let message of this.conversation?.messages){
          console.log(message.from?._id)
          console.log(this.me?._id)
        }*/
      }
    }

    handleNewMessage(): void {
        if (this.socketService != undefined) {
            this.socketService.newMessage.subscribe((chat) => {
                if (chat && chat.conversationId === this.conversation?._id) {
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
    }

    //I send a message so I get the string content and make Chat object to send
    public addMessage(message: string): void {
        console.log('add message');
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
            conversationId: this.conversation?._id,
        };
        this.profilService.postMessage(chat);
        if (this.socketService != undefined) {
            this.socketService.sendChat(chat);
        }

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

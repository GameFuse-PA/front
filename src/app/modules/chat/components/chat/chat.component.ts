import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/modules/call/services/socket.service';
import { Chat } from '../../models/chat.model';
import { ChatRoom } from '../../models/chatRoom.model';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
    public chats: ChatRoom[] = [];
    constructor(private socketService: SocketService) {}

    ngOnInit(): void {
        this.handleNewMessage();
    }

    handleNewMessage(): void {
        this.socketService.newMessageForRoom.subscribe((chat) => {
            if (chat) {
                this.chats.push(chat);
                this.scrollToNewMessage();
            }
        });
    }

    //I send a message so I get the string content and make Chat object to send
    public addMessage(message: string): void {
        let userName;
        if (localStorage.getItem('user') !== null) {
            // @ts-ignore
            userName = JSON.parse(localStorage.getItem('user')).username;
        }

        //let photo = JSON.parse(localStorage.getItem("user")).avatar.location;
        let date = new Date();
        let chat: ChatRoom = {
            content: message,
            time: date.getTime(),
            isMe: true,
            userName: userName /*, userPhoto: photo*/,
        };
        this.socketService.chatRoom(message);
        this.chats.push(chat);
        this.scrollToNewMessage();
    }

    private scrollToNewMessage(): void {
        setTimeout(() => {
            const lastMessage = document.getElementById(`${this.chats.length - 1}`);
            if (lastMessage) {
                lastMessage.scrollIntoView();
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

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import io, { Socket } from 'socket.io-client';
import { UserToBackDTO } from '../../../utils/UserToBackDTO';
import { Chat } from '../../chat/models/chat.model';
import { MessageForBackModel } from '../../../models/messageForBack.model';
import { ChatRoom } from '../../chat/models/chatRoom.model';

@Injectable()
export class SocketService {
    public joinedId = new BehaviorSubject(null);
    public leavedId = new BehaviorSubject(null);
    // @ts-ignore
    public newMessageForRoom = new BehaviorSubject<ChatRoom>(null);
    // @ts-ignore
    public newMessageForConversation = new BehaviorSubject<Chat>(null);
    public socket: Socket;

    constructor() {
        const token = JSON.parse(localStorage.getItem('user') as string);
        this.socket = io('localhost:3000', {
            path: '/socket',
            extraHeaders: {
                Authorization: 'Bearer ' + token.access_token,
            },
        });
        this.handleUserConnect();
        this.handleNewMessage();
    }

    public joinRoom(user: UserToBackDTO): void {
        this.socket.emit('roomAccessRequest', user);
    }

    public chatRoom(content: string): void {
        this.socket.emit('chat', content);
    }

    public joinConversation(conversationId: string): void {
        this.socket.emit('conversationAccessRequest', conversationId);
    }

    public chatConversation(messageForBack: MessageForBackModel): void {
        this.socket.emit('chatConversation', messageForBack);
    }

    private handleUserConnect(): void {
        this.socket.on('user-connected', (userId) => {
            this.joinedId.next(userId);
        });
        this.socket.on('user-disconnected', (userId) => {
            this.leavedId.next(userId);
        });
    }

    private handleNewMessage(): void {
        this.socket.on('new-message-room', (chatStructure) => {
            console.log('nouveau message recu dans les room: ' + chatStructure);
            this.newMessageForRoom.next(chatStructure);
        });
        this.socket.on('new-message-conversation', (chatStructure) => {
            console.log('nouveau message recu dans les conversations: ' + chatStructure);
            this.newMessageForConversation.next(chatStructure);
        });
    }
}

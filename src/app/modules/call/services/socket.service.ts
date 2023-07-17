import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import io, { Socket } from 'socket.io-client';
import { MessageModel } from '../../../models/message.model';
import { JoinGameSessionChatDTO } from '../../../components/game-session/room/dto/JoinGameSessionChatDTO';
import {JoinGameSessionVisioDTO} from "../../../components/game-session/room/dto/JoinGameSessionVisioDTO";

@Injectable()
export class SocketService {
    public joinedId = new BehaviorSubject(null);
    public leavedId = new BehaviorSubject(null);
    // @ts-ignore
    public newMessage = new BehaviorSubject<MessageModel>(null);
    public socket: Socket;

    constructor() {
        //todo : recup depuis authservice et non du localstorage
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

    public joinGameSessionChat(request: JoinGameSessionChatDTO): void {
        this.socket.emit('roomAccessRequest', request);
    }

    public joinGameSessionVisio(request: JoinGameSessionVisioDTO): void {
      this.socket.emit('joinGameSessionVisio', request)
    }

    public joinConversation(): void {
        this.socket.emit('chatAccessRequest');
    }

    public sendChat(content: MessageModel): void {
        this.socket.emit('chat', content);
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
        this.socket.on('new-message', (chatStructure) => {
            console.log('nouveau msg recu');
            this.newMessage.next(chatStructure);
        });
    }
}

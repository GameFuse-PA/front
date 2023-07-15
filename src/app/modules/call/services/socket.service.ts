import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import io, { Socket } from 'socket.io-client';
import { UserToBackDTO } from '../../../utils/UserToBackDTO';
import { MessageModel } from '../../../models/message.model';
import {JoinRoomRequestDTO} from "../../../components/game-session/room/dto/JoinRoomRequestDTO";

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

    public joinRoom(request: JoinRoomRequestDTO): void {
        this.socket.emit('roomAccessRequest', request);
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
          console.log("nouveau msg recu")
            //TODO: ajouter le chat à la conv dont l'id est chatstructure.conversationId
            this.newMessage.next(chatStructure);
        });
    }
}

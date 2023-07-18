import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import io, { Socket } from 'socket.io-client';
import { MessageModel } from '../../../models/message.model';
import { JoinGameSessionChatDTO } from '../../../pages/game-session/dto/JoinGameSessionChatDTO';
import { JoinGameSessionVisioDTO } from '../../../pages/game-session/dto/JoinGameSessionVisioDTO';
import { AuthService } from '../../../services/auth/auth.service';
import { environment } from '../../../../environments/environment';

const URL = environment.apiUrl;
@Injectable()
export class SocketService {
    public joinedId = new BehaviorSubject(null);
    public leavedId = new BehaviorSubject(null);
    public newMessage = new BehaviorSubject<MessageModel | null>(null);
    public socket: Socket;

    constructor(private authService: AuthService) {
        const token = authService.user?.access_token;
        this.socket = io(URL, {
            path: '/socket',
            extraHeaders: {
                Authorization: 'Bearer ' + token,
            },
        });
        this.handleUserConnect();
        this.handleNewMessage();
    }

    public joinGameSessionChat(request: JoinGameSessionChatDTO): void {
        this.socket.emit('roomAccessRequest', request);
    }

    public joinGameSessionVisio(request: JoinGameSessionVisioDTO): void {
        this.socket.emit('joinGameSessionVisio', request);
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
            this.newMessage.next(chatStructure);
        });
    }
}

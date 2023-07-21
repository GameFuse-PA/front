import { Injectable } from '@angular/core';
import io, { Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';

const URL = environment.apiUrl;
@Injectable({
    providedIn: 'root',
})
export class WebsocketService {
    public socket: Socket;

    constructor(authService: AuthService) {
        const token = authService.user?.access_token;
        this.socket = io(URL, {
            path: '/sockets',
            extraHeaders: {
                Authorization: 'Bearer ' + token,
            },
        });
    }

    public emitAction(res: any, gameSessionId: string) {
        this.socket.emit('action-runner', {
            gameSessionId: gameSessionId,
            action: res,
        });
    }

    public connectRunner(gameSessionId: string) {
        this.socket.emit('connect-runner', gameSessionId);
    }

    public disconnectRunner(gameSessionId: string) {
        this.socket.emit('disconnect-runner', gameSessionId);
    }
}

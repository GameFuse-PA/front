import { User } from './user.model';
import { MessageModel } from './message.model';
import { Socket } from 'socket.io-client';
import { SocketService } from '../modules/call/services/socket.service';

export class ConversationModel {
    _id?: string;
    users?: User[];
    messages?: MessageModel[];
    socket?: SocketService;
}

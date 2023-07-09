import { User } from './user.model';
import { MessageModel } from './message.model';

export class ConversationModel {
    _id?: string;
    users?: User[];
    messages?: MessageModel[];
}

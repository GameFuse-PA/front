import {User} from "./user.model";

export class MessageModel {
  content?: string;
  from?: User;
  date?: number;
  conversationId?: string;
}

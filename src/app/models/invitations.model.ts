import {User} from "./user.model";

export class InvitationsModel {
  sender?: User
  receiver?: User
  created_at?: Date
}

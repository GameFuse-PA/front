import {Game} from "./game.model";
import {User} from "./user.model";

export class PartyModel {
  name?: string;
  description?: string;
  game?: Game;
  winner?: string;
  createdBy?: User;
  members?: User[];
}

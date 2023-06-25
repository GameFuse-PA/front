import {Game} from "./game.model";
import {User} from "./user.model";

export class GameSessionModel {
  name?: string;
  description?: string;
  game?: Game;
  winner?: string;
  createdBy?: User;
  members?: User[];
  status?: number;
}

import {Game} from "./game.model";
import {User} from "./user.model";
import {FormControl} from "@angular/forms";

export class GameSessionModel {
  name?: string;
  game?: Game;
  winner?: string;
  createdBy?: User;
  players?: User[];
  status?: number;
}

export class GameSessionCreateModel {
  name?: string;
  game?: string;
  createdBy?: string;
  players?: string[];
  status?: number;
}

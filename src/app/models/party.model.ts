import {Game} from "./game.model";
import {User} from "./user.model";
import {FormControl} from "@angular/forms";

export class PartyModel {
  name?: string;
  game?: Game;
  winner?: string;
  createdBy?: User;
  members?: User[];
}

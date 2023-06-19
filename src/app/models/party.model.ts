import {Game} from "./game.model";

export class PartyModel {
  name?: string;
  description?: string;
  game?: Game;
  winner?: string;
  createdBy?: string;
}

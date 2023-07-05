import { Game } from '../game.model';
import { User } from '../user.model';
import { FormControl } from '@angular/forms';

export class GameSessionModel {
    name?: string;
    game?: Game;
    winner?: string;
    createdBy?: User;
    players?: User[];
    status?: number;
}

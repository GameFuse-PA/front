import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Game } from '../../models/game.model';

const URL = environment.apiUrl + '/games/';
@Injectable({
    providedIn: 'root',
})
export class GameService {
    constructor(private http: HttpClient) {}

    addGame(game: Game) {
        return this.http.post(URL, game);
    }
}

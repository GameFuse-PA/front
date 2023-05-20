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
        const formData: FormData = new FormData();
        if (game.banner) formData.append('banner', game.banner);
        if (game.program) formData.append('program', game.program);
        if (game.name) formData.append('name', game.name);
        if (game.description) formData.append('description', game.description);
        return this.http.post(URL, formData);
    }
}
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

const URL = environment.apiUrl + '/scoreboards';
@Injectable({
    providedIn: 'root',
})
export class ScoreboardService {
    constructor(private http: HttpClient) {}

    getScoreboard(gameId: string, userSearch: string) {
        return this.http.get(`${URL}?gameId=${gameId}&userSearch=${userSearch}`);
    }
}

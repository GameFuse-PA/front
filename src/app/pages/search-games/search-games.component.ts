import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game/game.service';
import { Game } from '../../models/game.model';

@Component({
    selector: 'app-search-games',
    templateUrl: './search-games.component.html',
    styleUrls: ['./search-games.component.css'],
})
export class SearchGamesComponent implements OnInit {
    search: string = '';
    games: Game[] = [];
    loading: boolean = false;

    constructor(public gameService: GameService) {}

    ngOnInit(): void {
        this.searchGames();
    }

    searchGames() {
        this.loading = true;

        this.gameService.getGames(this.search).subscribe({
            next: (res: any) => {
                this.games = res;
                this.loading = false;
            },
            error: (err: Error) => {
                this.loading = false;
            },
        });
    }
}

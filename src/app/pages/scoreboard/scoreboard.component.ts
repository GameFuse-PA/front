import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game.model';
import { ScoreboardService } from '../../services/scoreboard/scoreboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameService } from '../../services/game/game.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-scoreboard',
    templateUrl: './scoreboard.component.html',
    styleUrls: ['./scoreboard.component.css'],
})
export class ScoreboardComponent implements OnInit {
    public games: Game[] = [];
    public selectedGame: string = '';
    public searchUser: string = '';
    public players: User[] = [];

    public defaultGame: Game = {
        _id: '',
        name: 'Tous les jeux',
    };

    constructor(
        private scoreboardService: ScoreboardService,
        private snackBar: MatSnackBar,
        private gameService: GameService,
    ) {}

    ngOnInit(): void {
        this.getGames();
        this.searchScoreboard();
    }

    searchScoreboard(): void {
        this.scoreboardService.getScoreboard(this.selectedGame, this.searchUser).subscribe({
            next: (res: any) => {
                this.players = res;
            },
            error: (err: any) => {
                this.snackBar.open(err.message, 'Fermer', {
                    duration: 3000,
                    panelClass: ['error-snackbar'],
                });
            },
        });
    }

    getGames(): void {
        this.gameService.getGames().subscribe({
            next: (res: any) => {
                this.games = res;
                this.games.unshift(this.defaultGame);
                this.selectedGame = this.games[0]._id!;
            },
            error: (err: any) => {
                this.snackBar.open(err.message, 'Fermer', {
                    duration: 3000,
                    panelClass: ['error-snackbar'],
                });
            },
        });
    }
}

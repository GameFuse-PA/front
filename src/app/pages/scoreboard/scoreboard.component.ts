import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game.model';
import { ScoreboardService } from '../../services/scoreboard/scoreboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameService } from '../../services/game/game.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';

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
    public onlyFriends: boolean = false;

    public defaultGame: Game = {
        _id: '',
        name: 'Tous les jeux',
    };

    constructor(
        private scoreboardService: ScoreboardService,
        private snackBar: MatSnackBar,
        private gameService: GameService,
        public authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.getGames();
        this.searchScoreboard();
    }

    searchScoreboard(): void {
        let request;

        if (this.onlyFriends) {
            request = this.scoreboardService.getFriendsScoreboard(
                this.selectedGame,
                this.searchUser,
            );
        } else {
            request = this.scoreboardService.getScoreboard(this.selectedGame, this.searchUser);
        }

        request.subscribe({
            next: (res: any) => {
                console.log(res);
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

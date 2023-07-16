import { Component, OnInit } from '@angular/core';
import { Game } from '../../../models/game.model';
import { User } from '../../../models/user.model';
import { ProfilService } from '../../../services/profil/profil.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { GameSessionCreateModel } from '../../../models/game-session/game-session-create.model';
import { Router } from '@angular/router';
import { GameSessionService } from '../../../services/game-session/game-session.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth/auth.service';
import { GameSessionStatus } from '../../../utils/enum';
import { GameService } from '../../../services/game/game.service';

@Component({
    selector: 'app-create-game-session-dialog',
    templateUrl: './create-game-session-dialog.component.html',
    styleUrls: ['./create-game-session-dialog.component.css'],
})
export class CreateGameSessionDialogComponent implements OnInit {
    session: GameSessionCreateModel = {
        name: undefined,
        game: undefined,
        players: undefined,
        status: undefined,
    };

    listGames: Game[] = [];
    listUsers: User[] = [];

    minPlayers: number = 0;
    maxPlayers: number = 0;

    loading: boolean = false;
    error: string | undefined;

    users = new FormControl('');

    constructor(
        private profilService: ProfilService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private gameSessionService: GameSessionService,
        public dialogRef: MatDialogRef<CreateGameSessionDialogComponent>,
        private authServices: AuthService,
        private gameService: GameService,
    ) {}
    ngOnInit(): void {
        this.profilService.getFriends().subscribe({
            next: (friends: any) => {
                if (friends.length === 0) {
                    this._snackBar.open("Vous n'avez pas d'ami malheureusement", 'Fermer', {
                        duration: 5000,
                        panelClass: ['error-snackbar'],
                    });
                    return;
                }
                this.listUsers = friends.friends;
            },
            error: () => {
                this._snackBar.open("Vous n'avez pas d'ami malheureusement", 'Fermer', {
                    duration: 5000,
                    panelClass: ['error-snackbar'],
                });
            },
        });

        this.gameService.getGames().subscribe({
            next: (games: any) => {
                if (games.length === 0) {
                    this._snackBar.open(
                        "Il n'y a aucun jeu de disponible, veuillez créer un jeu avant",
                        'Fermer',
                        {
                            duration: 5000,
                            panelClass: ['error-snackbar'],
                        },
                    );
                    return;
                }
                this.listGames = games;
            },
            error: (_: any) => {
                this._snackBar.open(
                    "Il n'y a aucun jeu de disponible, veuillez créer un jeu avant",
                    'Fermer',
                    {
                        duration: 5000,
                        panelClass: ['error-snackbar'],
                    },
                );
            },
        });
    }

    onGameSelected(game: Game) {
        this.minPlayers = game.minPlayers!;
        this.maxPlayers = game.maxPlayers!;
    }

    onCreateRoom() {
        this.loading = true;
        if (!this.users.value) {
            this.loading = false;
            this.error = 'Veuillez remplir tous les champs';
            return;
        }
        this.session.players = [this.authServices.user?._id, ...this.users.value];
        this.session.status = GameSessionStatus.In_Progress;

        this.gameSessionService.createGameSession(this.session).subscribe({
            next: async (sessionSaved: any) => {
                this.loading = false;
                this.dialogRef.close();
                this.router.navigateByUrl(`/room/${sessionSaved._id}`);
            },
            error: (err: any) => {
                this.loading = false;
                this._snackBar.open(err.message, 'Fermer', {
                    panelClass: ['error-snackbar'],
                });
            },
        });
    }
}

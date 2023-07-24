import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Collection } from 'ngx-pagination';
import { ProfilService } from '../../services/profil/profil.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateGameSessionDialogComponent } from '../../components/create-game-session-dialog/create-game-session-dialog.component';
import { GameSessionModel } from '../../models/game-session/game-session.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-list-game-session',
    templateUrl: './list-game-session.component.html',
    styleUrls: ['./list-game-session.component.css'],
})
export class ListGameSessionComponent implements OnInit {
    readonly user: User = JSON.parse(localStorage.getItem('user') || '{}');
    gameSessions: Collection<GameSessionModel> = [];

    page: number = 1;

    @Input() maxSize: number = 6;

    constructor(
        private profilService: ProfilService,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
        this.profilService.getGameSessions().subscribe({
            next: (gameSessions: any) => {
                this.gameSessions = gameSessions;
            },
            error: (err: any) => {
                this._snackBar.open(err.message, 'Fermer', {
                    panelClass: ['error-snackbar'],
                });
            },
        });
    }

    createGameSession() {
        this.dialog.open(CreateGameSessionDialogComponent, {
            width: '700px',
            autoFocus: false,
            disableClose: true,
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SaveGameDialogComponent } from '../../components/save-game-dialog/save-game-dialog.component';
import { Game } from '../../models/game.model';
import { ProfilService } from '../../services/profil/profil.service';

@Component({
    selector: 'app-my-games',
    templateUrl: './my-games.component.html',
    styleUrls: ['./my-games.component.css'],
})
export class MyGamesComponent implements OnInit {
    games: Game[] = [];
    constructor(public dialog: MatDialog, public profilService: ProfilService) {}

    ngOnInit(): void {
        this.getGames();
    }

    addGameDialog() {
        this.dialog.open(SaveGameDialogComponent, {
            width: '700px',
            autoFocus: false,
            disableClose: true,
        });

        this.dialog.afterAllClosed.subscribe({
            next: () => {
                this.getGames();
            },
        });
    }

    getGames() {
        this.profilService.getGames().subscribe({
            next: (res: any) => {
                this.games = res;
            },
        });
    }
}

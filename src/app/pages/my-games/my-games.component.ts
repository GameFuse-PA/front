import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddGameDialogComponent } from '../../components/add-game-dialog/add-game-dialog.component';
import { Game } from '../../models/game.model';
import { ProfilService } from '../../services/profil/profil.service';
import { User } from '../../models/user.model';

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
        this.dialog.open(AddGameDialogComponent, {
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

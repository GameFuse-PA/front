import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddGameDialogComponent } from '../../components/add-game-dialog/add-game-dialog.component';

@Component({
    selector: 'app-my-games',
    templateUrl: './my-games.component.html',
    styleUrls: ['./my-games.component.css'],
})
export class MyGamesComponent implements OnInit {
    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {
        this.dialog.open(AddGameDialogComponent, {
            width: '700px',
            autoFocus: false,
            disableClose: true,
        });
    }

    addGameDialog() {
        this.dialog.open(AddGameDialogComponent, {
            width: '700px',
            autoFocus: false,
            disableClose: true,
        });
    }
}

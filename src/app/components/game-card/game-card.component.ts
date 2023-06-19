import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game/game.service';
import { MatDialog } from '@angular/material/dialog';
import { SaveGameDialogComponent } from '../save-game-dialog/save-game-dialog.component';

@Component({
    selector: 'app-game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent implements OnInit {
    @Input() game: Game = {};
    @Output() reload: EventEmitter<void> = new EventEmitter();

    constructor(public gameService: GameService, public dialog: MatDialog) {}
    ngOnInit(): void {}

    deleteGame() {
        this.gameService.deleteGame(this.game._id).subscribe({
            next: (res: any) => {
                this.reload.emit();
            },
        });
    }

    modifyGame() {
        this.dialog.open(SaveGameDialogComponent, {
            width: '700px',
            autoFocus: false,
            disableClose: true,
            data: this.game,
        });

        this.dialog.afterAllClosed.subscribe({
            next: () => {
                this.reload.emit();
            },
        });
    }
}

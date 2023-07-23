import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game/game.service';
import { MatDialog } from '@angular/material/dialog';
import { SaveGameDialogComponent } from '../save-game-dialog/save-game-dialog.component';
import { CreateGameSessionDialogComponent } from '../create-game-session-dialog/create-game-session-dialog.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent implements OnInit {
    @Input() game: Game = {};
    @Input() readonly: boolean = false;
    @Output() reload: EventEmitter<void> = new EventEmitter();

    constructor(
        public gameService: GameService,
        public dialog: MatDialog,
        public authService: AuthService,
        public router: Router,
    ) {}
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

    playGame() {
        if (this.authService.user) {
            this.dialog.open(CreateGameSessionDialogComponent, {
                width: '700px',
                autoFocus: false,
                disableClose: true,
                data: this.game._id,
            });
        } else {
            this.router.navigate(['/auth']);
        }
    }
}

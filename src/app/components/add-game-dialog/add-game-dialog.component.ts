import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game/game.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-add-game-dialog',
    templateUrl: './add-game-dialog.component.html',
    styleUrls: ['./add-game-dialog.component.css'],
})
export class AddGameDialogComponent implements OnInit {
    game: Game = {
        name: '',
        description: '',
        banner: undefined,
        program: undefined,
    };
    loading: boolean = false;
    error: string = '';

    constructor(
        public gameService: GameService,
        public dialogRef: MatDialogRef<AddGameDialogComponent>,
    ) {}

    ngOnInit(): void {}

    onFileChange(event: any, type: string) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            if (type === 'banner') {
                this.game.banner = file;
            } else if (type === 'program') {
                this.game.program = file;
            }
        }
    }

    addGame() {
        this.loading = true;
        this.error = '';
        this.gameService.addGame(this.game).subscribe({
            next: (res: any) => {
                this.loading = false;
                this.dialogRef.close();
            },
            error: (err: Error) => {
                this.error = err.message;
                this.loading = false;
            },
        });
    }
}

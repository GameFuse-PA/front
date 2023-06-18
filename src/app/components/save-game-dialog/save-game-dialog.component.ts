import { Component, Inject, OnInit } from '@angular/core';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game/game.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-save-game-dialog',
    templateUrl: './save-game-dialog.component.html',
    styleUrls: ['./save-game-dialog.component.css'],
})
export class SaveGameDialogComponent implements OnInit {
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
        public dialogRef: MatDialogRef<SaveGameDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Game,
    ) {}

    ngOnInit(): void {
        if (this.data) {
            this.game = this.data;
        }
    }

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

    saveGame() {
        this.loading = true;
        this.error = '';
        let request;

        if (this.game._id) {
            request = this.gameService.updateGame(this.game);
        } else {
            request = this.gameService.addGame(this.game);
        }

        request.subscribe({
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

    showFile(url: any) {
        window.open(url);
    }
}

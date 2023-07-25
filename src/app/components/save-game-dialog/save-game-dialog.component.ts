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

    languages = [
        {
            value: 'java',
            viewValue: 'Java 17.0.7',
        },
        {
            value: 'python',
            viewValue: 'Python 3.9.2',
        },
        {
            value: 'c',
            viewValue: 'C 11',
        },
    ];

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
            } else if (type === 'entry') {
                this.game.entry = file;
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

    acceptFile() {
        if (this.game.language === 'java') {
            return '.jar';
        } else if (this.game.language === 'python') {
            return '.py';
        } else if (this.game.language === 'c') {
            return '.c';
        } else {
            return '';
        }
    }

    showFile(url: any) {
        window.open(url);
    }
}

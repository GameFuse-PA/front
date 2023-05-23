import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game/game.service';

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
        file: undefined,
    };
    loading: boolean = false;
    error: string = '';

    constructor(public gameService: GameService) {}

    ngOnInit(): void {}

    onFileChange(event: any, type: string) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            if (type === 'banner') {
                this.game.banner = file;
            } else if (type === 'file') {
                this.game.file = file;
            }
        }
    }

    addGame() {
        this.loading = true;
        this.error = '';
        this.gameService.addGame(this.game).subscribe({
            next: (res: any) => {
                console.log(res); // will be handled later
                this.loading = false;
            },
            error: (err: Error) => {
                this.error = err.message;
                this.loading = false;
            },
        });
    }
}

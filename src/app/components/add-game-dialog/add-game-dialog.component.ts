import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game.model';

@Component({
    selector: 'app-add-game-dialog',
    templateUrl: './add-game-dialog.component.html',
    styleUrls: ['./add-game-dialog.component.css'],
})
export class AddGameDialogComponent implements OnInit {
    game: Game = {
        name: '',
        description: '',
        logo: undefined,
        background: undefined,
        file: undefined,
    };

    constructor() {}

    ngOnInit(): void {}

    onFileChange(event: any, type: string) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            if (type === 'logo') {
                this.game.logo = file;
            } else if (type === 'background') {
                this.game.background = file;
            } else if (type === 'file') {
                this.game.file = file;
            }
        }
    }
}

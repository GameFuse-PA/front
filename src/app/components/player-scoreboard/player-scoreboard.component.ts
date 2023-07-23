import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-player-scoreboard',
    templateUrl: './player-scoreboard.component.html',
    styleUrls: ['./player-scoreboard.component.css'],
})
export class PlayerScoreboardComponent implements OnInit {
    @Input() players: User[] = [];
    columns: string[] = ['position', 'player', 'score'];

    constructor() {}

    ngOnInit(): void {}

    getColor(position: number): string {
        switch (position) {
            case 1:
                return 'gold';
            case 2:
                return 'silver';
            case 3:
                return '#cd7f32';
            default:
                return 'black';
        }
    }
}

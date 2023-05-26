import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game/game.service';

@Component({
    selector: 'app-game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent implements OnInit {
    @Input() game: Game = {};
    @Output() reload: EventEmitter<void> = new EventEmitter();

    constructor(public gameService: GameService) {}
    ngOnInit(): void {}

    deleteGame() {
        this.gameService.deleteGame(this.game._id).subscribe({
            next: (res: any) => {
                this.reload.emit();
            },
        });
    }
}

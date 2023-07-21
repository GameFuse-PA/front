import { Component, Input, OnInit } from '@angular/core';
import { GameSessionModel } from '../../models/game-session/game-session.model';
import { User } from '../../models/user.model';
import { GameSessionStatus } from '../../utils/enum';
import { Router } from '@angular/router';

@Component({
    selector: 'app-game-session-card',
    templateUrl: './game-session-card.component.html',
    styleUrls: ['./game-session-card.component.css'],
})
export class GameSessionCardComponent implements OnInit {
    @Input() gameSession: GameSessionModel | undefined;
    @Input() user: User | undefined;

    gameSessionStatusClass: string = '';
    gameSessionStatusText: string = '';
    gameSessionButtonClass: string = '';
    gameSessionButtonText: string = '';

    constructor(private router: Router) {}

    ngOnInit(): void {
        switch (this.gameSession?.status) {
            case GameSessionStatus.In_Progress:
                this.gameSessionStatusClass = 'status game-session-in-progress';
                this.gameSessionStatusText = 'Partie en cours';
                this.gameSessionButtonClass = 'w-full mt-10 bg-[color:var(--success)] text-white';
                this.gameSessionButtonText = 'Rejoindre la partie';
                break;
            case GameSessionStatus.Terminated:
                this.gameSessionStatusClass = 'status game-session-terminated';
                this.gameSessionStatusText = 'Partie terminé';
                this.gameSessionButtonClass = 'w-full mt-10 bg-[color:var(--primary)] text-white';
                this.gameSessionButtonText = 'Voir le résultat';
                break;
            default:
                this.gameSessionStatusClass = 'status error-game-status';
                this.gameSessionStatusText = 'Erreur';
                this.gameSessionButtonClass = 'w-full mt-10 bg-[color:var(--success)] text-white';
                this.gameSessionButtonText = 'Rejoindre la partie (erreur potentielle)';
        }
    }

    joinGameSession() {
        this.router.navigateByUrl(`/room/${this.gameSession?._id!}`);
    }
}

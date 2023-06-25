import {Component, Input, OnInit} from '@angular/core';
import {GameSessionModel} from "../../../models/game-session.model";
import {User} from "../../../models/user.model";
import {GameSessionStatus} from "../../../utils/enum";

@Component({
  selector: 'app-game-session-card',
  templateUrl: './game-session-card.component.html',
  styleUrls: ['./game-session-card.component.css']
})
export class GameSessionCardComponent implements OnInit {

  @Input() gameSession: GameSessionModel | undefined;
  @Input() user: User | undefined;

  gameSessionStatusClass: string = '';
  gameSessionStatusText: string = '';
  gameSessionButtonClass: string = '';
  gameSessionButtonText: string = '';


  constructor() { }

  ngOnInit(): void {

    switch (this.gameSession?.status) {
      case GameSessionStatus.In_Progress:
        this.gameSessionStatusClass = 'game-session-in-progress';
        this.gameSessionStatusText = 'Partie en cours';
        this.gameSessionButtonClass = 'button-game mt-10 bg-[color:var(--success)] text-white';
        this.gameSessionButtonText = 'Rejoindre la partie';
        break;
      case GameSessionStatus.Terminated:
        this.gameSessionStatusClass = 'game-session-terminated';
        this.gameSessionStatusText = 'Partie terminé';
        this.gameSessionButtonClass = 'button-game mt-10 bg-[color:var(--primary)] text-white';
        this.gameSessionButtonText = 'Voir le replay';
        break;
      default:
        this.gameSessionStatusClass = 'error-game-status';
        this.gameSessionStatusText = 'Erreur';
        this.gameSessionButtonClass = 'button-game mt-10 bg-[color:var(--success)] text-white';
        this.gameSessionButtonText = 'Rejoindre la partie (erreur potentielle)';
    }

  }

  protected readonly gameSessionEnum = GameSessionStatus;
}

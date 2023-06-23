import {Component, Input, OnInit} from '@angular/core';
import {GameSessionModel} from "../../../models/game-session.model";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-parties-card',
  templateUrl: './game-session-card.component.html',
  styleUrls: ['./game-session-card.component.css']
})
export class GameSessionCardComponent implements OnInit {

  @Input() gameSession: GameSessionModel | undefined;
  @Input() user: User | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}

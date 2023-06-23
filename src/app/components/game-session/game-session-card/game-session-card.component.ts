import {Component, Input, OnInit} from '@angular/core';
import {PartyModel} from "../../../models/party.model";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-parties-card',
  templateUrl: './game-session-card.component.html',
  styleUrls: ['./game-session-card.component.css']
})
export class GameSessionCardComponent implements OnInit {

  @Input() party: PartyModel | undefined;
  @Input() user: User | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}

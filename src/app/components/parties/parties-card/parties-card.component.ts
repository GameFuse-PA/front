import {Component, Input, OnInit} from '@angular/core';
import {PartyModel} from "../../../models/party.model";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-parties-card',
  templateUrl: './parties-card.component.html',
  styleUrls: ['./parties-card.component.css']
})
export class PartiesCardComponent implements OnInit {

  @Input() party: PartyModel | undefined;
  @Input() user: User | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}

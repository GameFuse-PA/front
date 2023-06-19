import {Component, Input, OnInit} from '@angular/core';
import {PartyModel} from "../../../models/party.model";

@Component({
  selector: 'app-parties-card',
  templateUrl: './parties-card.component.html',
  styleUrls: ['./parties-card.component.css']
})
export class PartiesCardComponent implements OnInit {

  @Input() party: PartyModel | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import {ConversationModel} from "../../../models/conversation.model";

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  public conversation: ConversationModel | undefined;
    constructor() {}

    isHideChat = true;

    ngOnInit(): void {
    }
}

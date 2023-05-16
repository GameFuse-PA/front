import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Utils from "../../utils/utils";
import {environment} from "../../../environments/environment";
import {ChatService} from "../../services/chat/chat.service";
const URL = environment.apiUrl
@Component({
  selector: 'app-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.scss']
})
export class ChatHomeComponent {
  constructor(private router: Router, private chatService: ChatService) { }

  public async createRoom(): Promise<void> {
    const roomId = Utils.genRoomId();
    this.router.navigateByUrl(`/call/${roomId}`)
  }
}

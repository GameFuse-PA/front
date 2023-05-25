import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Utils from '../../utils/utils';
import { environment } from '../../../environments/environment';
import { RoomService } from '../../services/chat/room.service';
const URL = environment.apiUrl;
@Component({
    selector: 'app-home',
    templateUrl: './chat-home.component.html',
    styleUrls: ['./chat-home.component.scss'],
})
export class ChatHomeComponent {
    constructor(private router: Router, private roomService: RoomService) {}

      public async createRoom() {
        this.roomService.createRoom().subscribe({
          next: (roomId:string) => {
            this.router.navigateByUrl(`/call/${roomId}`);
          },
          error: (err: Error) => {
            console.log(err)
          },
        });
    }
}

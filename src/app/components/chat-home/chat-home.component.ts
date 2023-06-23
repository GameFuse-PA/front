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
        this.roomService.create().subscribe({
            next: (room: any) => {
                const roomId = room._id;
                this.router.navigateByUrl(`/room/${roomId}`);
            },
            error: (err: Error) => {
                console.log(err);
            },
        });
    }
}

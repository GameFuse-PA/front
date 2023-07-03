import { FriendRequestModel } from '../../models/friend-request.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

const URL = environment.apiUrl + '/invitations';

@Injectable({
    providedIn: 'root',
})
export class InvitationsService {
    friends: FriendRequestModel | null = null;

    constructor(private http: HttpClient) {}

    acceptInviteFriend(friend: string) {
        return this.http.post(`${URL}/accept`, {
            idFriend: friend,
        });
    }

    refuseInviteFriend(friend: string) {
        return this.http.post(`${URL}/refuse`, {
            idFriend: friend,
        });
    }
}

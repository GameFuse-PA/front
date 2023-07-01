import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FriendRequestModel } from '../../models/friend-request.model';

const URL = environment.apiUrl + '/friends';

@Injectable({
    providedIn: 'root',
})
export class FriendsService {
    friends: FriendRequestModel | null = null;

    constructor(private http: HttpClient) {}
    removeFriend(friend: string) {
      return this.http.delete(`${URL}/${friend}`);
    }
}

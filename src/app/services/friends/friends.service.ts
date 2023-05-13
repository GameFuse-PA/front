import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FriendsModel } from '../../models/friends.model';

const URL = environment.apiUrl + '/auth/';

@Injectable({
    providedIn: 'root',
})
export class FriendsService {
    friends: FriendsModel | null = null;

    constructor(private http: HttpClient) {}

    addFriend(friend: string) {
        return this.http.post(URL + 'addFriend', {
            idFriend: friend,
        });
    }

    removeFriend(friend: string) {
        return this.http.delete(URL + 'removeFriend' + `/${friend}`);
    }
}

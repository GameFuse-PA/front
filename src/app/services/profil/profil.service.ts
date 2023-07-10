import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import {MessageModel} from "../../models/message.model";

const URL = environment.apiUrl + '/me';

@Injectable({
    providedIn: 'root',
})
export class ProfilService {
    constructor(private http: HttpClient) {}

    uploadImage(file: File) {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post(URL + '/photo', formData);
    }

    updateMe(user: User) {
        return this.http.put(`${URL}`, user);
    }

    updatePassword(password: string) {
        return this.http.put(`${URL}/password`, { password: password });
    }

    getMe() {
        return this.http.get(`${URL}`);
    }

    getFriends() {
        return this.http.get(`${URL}/friends`);
    }

    getGames() {
        return this.http.get(`${URL}/games`);
    }

    getGameSessions() {
        return this.http.get(`${URL}/game-sessions`);
    }

    getInvitations() {
        return this.http.get(`${URL}/invitations`);
    }

    getInvitation(id: string) {
        return this.http.get(`${URL}/invitations/${id}`);
    }

    getConversations() {
        return this.http.get(`${URL}/conversations`);
    }

    postMessage(message: MessageModel) {
        return this.http.put(`${URL}/conversations/message`, message);
    }

    getConversation(id: string) {
        return this.http.get(`${URL}/conversations/${id}`);
    }
}

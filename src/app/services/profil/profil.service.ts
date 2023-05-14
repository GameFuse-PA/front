import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';

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

    getFriends() {
        return this.http.get(`${URL}/MyFriends`);
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const URL = environment.apiUrl + '/games';

@Injectable({
    providedIn: 'root',
})
export class RunnerService {
    constructor(private http: HttpClient) {}

    start(gameId: string) {
        return this.http.get(`${URL}/${gameId}/start`);
    }

    sendMessage(pid: number, message: string) {
        return this.http.post(`${URL}/${pid}/message`, { message: message });
    }
}

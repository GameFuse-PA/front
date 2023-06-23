import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { NO_AUTH } from '../request.interceptor';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const URL = environment.apiUrl + '/rooms';

@Injectable({
    providedIn: 'root',
})
export class RoomService {
    constructor(private http: HttpClient) {}

    create() {
        return this.http.post(URL, { responseType: 'text' });
    }
}

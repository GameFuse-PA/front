import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { NO_AUTH } from '../request.interceptor';
import { Router } from '@angular/router';

const URL = environment.apiUrl + "/chat/";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: User | null = null;

  constructor(private http: HttpClient) {}

  createConversation(roomId: string) {
    console.log("avant le get");
    console.log(URL + `/createRoom/${roomId}`)
    return this.http.post(URL + `/createRoom`, {
      roomId: roomId
    });
  }

}

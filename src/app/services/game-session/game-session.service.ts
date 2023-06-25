import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {GameSessionCreateModel} from "../../models/game-session.model";

const URL = environment.apiUrl + '/game-sessions';
@Injectable({
  providedIn: 'root'
})
export class GameSessionService {

  constructor(private http: HttpClient) { }

  createGameSession(body: GameSessionCreateModel) {
    return this.http.post(`${URL}`, body);
  }

}

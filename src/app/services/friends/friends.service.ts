import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { NO_AUTH } from '../request.interceptor';
import { Router } from '@angular/router';
import {FriendsModel} from "../../models/friends.model";

const URL = environment.apiUrl + "/auth/";
const httpOptions = {
  context: new HttpContext().set(NO_AUTH, true)
};

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  friends: FriendsModel | null = null;

  constructor(
    private http: HttpClient,
    private router: Router) {}

  addFriend(friend: string) {
    return this.http.post(URL + "addFriend", {
      idFriend: friend,
    });
  }

  removeFriend(friend: string) {
    return this.http.delete(URL + "removeFriend" + `/${friend}`)
  }


}

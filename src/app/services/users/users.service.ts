import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/user.model";

const URL = environment.apiUrl + '/users';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersSearched: User[] | null = null;
  constructor(private http: HttpClient) { }

  searchUsers(search: string) {
    return this.http.get(`${URL}/search?value=${search}`);
  }

}

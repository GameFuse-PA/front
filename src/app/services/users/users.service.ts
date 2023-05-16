import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

const URL = environment.apiUrl + '/users';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  searchUsers(search: string) {
    return this.http.get(`${URL}/search?value=${search}`);
  }

}

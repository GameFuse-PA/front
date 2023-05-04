import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpContext} from "@angular/common/http";
import {NO_AUTH} from "../request.interceptor";
import {User} from "../../models/user.model";

const URL = environment.apiUrl + "/me/";


@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(
    private http: HttpClient
  ) {}

  uploadImage(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(URL + 'photo', formData);
  }

  updateMe(user: User) {
    return this.http.put(URL, user);
  }


}

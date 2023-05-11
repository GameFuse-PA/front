import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { NO_AUTH } from '../request.interceptor';
import { Router } from '@angular/router';

const URL = environment.apiUrl + "/chat/";
const httpOptions = {
  context: new HttpContext().set(NO_AUTH, true)
};

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: User | null = null;

  constructor(
    private http: HttpClient,
    private router: Router) {}

  createConversation(user: User) {
    return this.http.post(URL + "login", {
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  register(user: User) {
    return this.http.post(URL + "register", {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
  }
}

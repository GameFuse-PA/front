import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Utils from "../../utils/utils";
import {environment} from "../../../environments/environment";
const URL = environment.apiUrl
@Component({
  selector: 'app-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.scss']
})
export class ChatHomeComponent {
  constructor(private router: Router/*, private http: HttpClient*/) { }

  public createRoom(): void {
    const roomId = Utils.genRoomId();
    /*console.log("avant le get");
    console.log(URL + `/createRoom/${roomId}`)
    //this.http.get(URL + `/createRoom/${roomId}`);
    console.log("apres le get")*/
    this.router.navigateByUrl(`/call/${roomId}`)
  }
}

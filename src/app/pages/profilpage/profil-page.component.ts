import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-profilpagesolo',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit {

  profilPic: string|undefined = undefined

  constructor(private router: Router, private authServices: AuthService) {
    if (this.authServices.user?.avatar){
      const user = JSON.parse(localStorage.getItem('user') as string)
      this.profilPic = user.avatar.location
    }
  }

  ngOnInit(): void {
  }

}

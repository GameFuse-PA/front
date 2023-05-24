import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import {TokenUtils} from "../../utils/tokenUtils";

@Component({
    selector: 'app-profilpagesolo',
    templateUrl: './profil-page.component.html',
    styleUrls: ['./profil-page.component.css'],
})
export class ProfilPageComponent implements OnInit {
    profilPic: string | undefined = undefined;

    constructor(private router: Router, private authServices: AuthService) {
        const user = JSON.parse(localStorage.getItem('user') as string);
        if (!this.authServices.user?.access_token) {
          this.authServices.logout()
          return
        }
        if (TokenUtils.isTokenExpired(this.authServices.user?.access_token)) {
          this.authServices.logout()
          return
        }
        if (this.authServices.user?.avatar) {
            this.profilPic = user.avatar.location;
        }
    }

    ngOnInit(): void {}
}

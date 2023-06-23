import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ProfilService } from '../../services/profil/profil.service';

@Component({
    selector: 'app-profilpagesolo',
    templateUrl: './profil-page.component.html',
    styleUrls: ['./profil-page.component.css'],
})
export class ProfilPageComponent implements OnInit {
    profilPic: string | undefined = undefined;

    constructor(
        private router: Router,
        private profilService: ProfilService,
        private authServices: AuthService,
    ) {
        const user = JSON.parse(localStorage.getItem('user') as string);
        if (!this.authServices.user?.access_token) {
            this.authServices.logout();
            return;
        }
        if (this.authServices.user?.avatar) {
            this.profilPic = user.avatar.location;
        }
    }

    ngOnInit(): void {
        this.profilService.getMe().subscribe({
            next: (user: any) => {
                this.authServices.user = user;
                if (this.authServices.user?.avatar) {
                    this.profilPic = user.avatar.location;
                }
            },
        });
    }
}

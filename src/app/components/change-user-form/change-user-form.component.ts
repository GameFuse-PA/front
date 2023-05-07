import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ProfilService } from '../../services/profil/profil.service';

@Component({
    selector: 'app-change-user-form',
    templateUrl: './change-user-form.component.html',
    styleUrls: ['./change-user-form.component.css'],
})
export class ChangeUserFormComponent implements OnInit {
    user: User = {
        firstname: undefined,
        lastname: undefined,
        email: undefined,
        birthdate: undefined,
        username: undefined,
    };

    ok: string | null = null;
    error: string | null = null;

    userPlaceholder: User = {
        firstname: '',
        lastname: '',
        email: '',
        birthdate: '',
    };

    constructor(
        private profilServices: ProfilService,
        private router: Router,
        private authServices: AuthService,
    ) {}

    ngOnInit(): void {
        if (!this.authServices.user) {
            this.router.navigate(['/auth']);
            return;
        }
        if (!localStorage.getItem('user')) {
            this.router.navigate(['/auth']);
            return;
        }
        this.userPlaceholder = JSON.parse(localStorage.getItem('user') as string);
        this.user.username = this.userPlaceholder.username;
        this.user.email = this.userPlaceholder.email;
    }

    private checkFields() {
        if (this.user.firstname === this.userPlaceholder.firstname) {
            this.user.firstname = undefined;
        }
        if (this.user.lastname === this.userPlaceholder.lastname) {
            this.user.lastname = undefined;
        }
        if (this.user.email === this.userPlaceholder.email) {
            this.user.email = undefined;
        }
        if (this.user.birthdate === this.userPlaceholder.birthdate) {
            this.user.birthdate = undefined;
        }
        if (this.user.username === this.userPlaceholder.username) {
            this.user.username = undefined;
        }
    }

    submit(): void {
        this.checkFields();
        this.profilServices.updateMe(this.user).subscribe({
            next: (res: any) => {
                this.ok = res.message;
                setTimeout(() => {
                    this.authServices.logout();
                }, 2500);
            },
            error: (err: Error) => {
                this.error = err.message;
            },
        });
    }
}

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

    maxDate: Date = new Date();
    ok: string | null = null;
    error: string | null = null;

    userPlaceholder: User = {
        firstname: '',
        lastname: '',
        email: '',
        birthdate: '',
        username: '',
    };

    constructor(
        private profilServices: ProfilService,
        private router: Router,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        if (!this.authService.user) {
            this.router.navigate(['/auth']);
            return;
        }

        this.userPlaceholder = this.authService.user;
        this.user.username = this.userPlaceholder.username;
        this.user.email = this.userPlaceholder.email;
        this.user.firstname = this.userPlaceholder.firstname;
        this.user.lastname = this.userPlaceholder.lastname;
        this.user.birthdate = this.userPlaceholder.birthdate;
    }

    submit(): void {
        this.error = null;
        this.profilServices.updateMe(this.user).subscribe({
            next: (res: any) => {
                this.ok = res.message;
                const token = this.authService.user?.access_token;
                this.authService.user = res.user;
                this.authService.user!.access_token = token;
                localStorage.setItem('user', JSON.stringify(res.user));

                setTimeout(() => {
                    this.ok = null;
                }, 3000);
            },
            error: (err: Error) => {
                this.error = err.message;
            },
        });
    }
}

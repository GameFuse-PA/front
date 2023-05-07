import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../../services/profil/profil.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-change-password-user-form',
    templateUrl: './change-password-user-form.component.html',
    styleUrls: ['./change-password-user-form.component.css'],
})
export class ChangePasswordUserFormComponent implements OnInit {
    changePassword = {
        password: '',
        checkPassword: '',
    };

    ok: string | null = null;
    error: string | null = null;
    constructor(private profilServices: ProfilService, private authService: AuthService) {}

    ngOnInit(): void {}

    onSubmit(): void {
        if (!this.changePassword.password || !this.changePassword.checkPassword) {
            this.error = 'Les champs ne peuvent pas être vides !';
            return;
        }

        if (this.changePassword.password !== this.changePassword.checkPassword) {
            this.error = 'Les mots de passes doivent être identiques';
            return;
        }

        this.profilServices.updatePassword(this.changePassword.password).subscribe({
            next: (res: any) => {
                this.ok = res.message;
                setTimeout(() => {
                    this.authService.logout();
                }, 6000);
            },
            error: (err: Error) => {
                this.error = err.message;
            },
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
    resetPassword: User = {
        email: '',
    };

    error: string | null = null;
    ok: string | null = null;
    constructor(private authServices: AuthService) {}

    ngOnInit(): void {}

    private resetOkError() {
        setTimeout(() => {
            this.error = null;
        }, 7000);
        setTimeout(() => {
            this.ok = null;
        }, 10000);
    }

    resetPasswordAsks(): void {
        if (!this.resetPassword.email) {
            this.error =
                'Votre email est requis avant de tenter une réinitialisation 😉';
            return;
        }
        this.resetOkError();
        this.authServices.resetPassword(this.resetPassword).subscribe({
            next: (res: any) => {
                this.ok =
                    'Si votre email est valide, vous allez recevoir un email avec un lien pour réinitialiser votre mot de passe.';
            },
            error: (err: Error) => {
                this.error = err.message;
            },
        });
    }
}

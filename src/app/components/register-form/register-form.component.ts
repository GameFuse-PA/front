import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
    user: User = {
        username: '',
        email: '',
        password: '',
    };
    confirmPassword = '';
    hide1: boolean = true;
    hide2: boolean = true;
    error: string | null = null;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {}

    register(): void {
        this.error = null;

        if (this.user.password !== this.confirmPassword) {
            this.error = 'Les mots de passe ne correspondent pas';
            return;
        }

        this.authService.register(this.user).subscribe({
            next: (res: any) => {
                let user: User = res.user;
                user.access_token = res.access_token;

                this.authService.user = user;
                localStorage.setItem('user', JSON.stringify(user));
            },
            error: (err: Error) => {
                this.error = err.message;
            },
        });
    }
}

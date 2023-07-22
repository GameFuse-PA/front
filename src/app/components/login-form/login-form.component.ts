import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
    user: User = {
        email: '',
        password: '',
    };
    error: string | null = null;
    hide: boolean = true;
    resetPassword: boolean = false;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {}

    login(): void {
        this.error = null;

        this.authService.login(this.user).subscribe({
            next: (res: any) => {
                let user: User = res.user;
                user.access_token = res.access_token;

                this.authService.user = user;
                localStorage.setItem('user', JSON.stringify(user));
                this.router.navigate(['/profil']);
            },
            error: (err: Error) => {
                this.error = err.message;
            },
        });
    }
}

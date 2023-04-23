import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  user: User = {
    email: '',
    password: '',
  }
  error: string | null = null;
  hide: boolean = true;
  resetPassword: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.error = null;

    this.authService.login(this.user).subscribe({
      next: (res: any) => {
        let user: User = res.user;
        user.access_token = res.access_token;

        this.authService.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('id', JSON.stringify(user.access_token));
      },
      error: (err: Error) => {
        this.error = err.message;
      }
    });
  }
}

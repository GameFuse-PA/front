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
      },
      error: (err: any) => {
        const errors = err.error.message;
        
        if (Array.isArray(errors)) {
          this.error = errors[0];
        } else {
          this.error = errors;
        }
      }
    });
  }
}

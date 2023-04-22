import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  user: User = {
    username: '',
    email: '',
    password: '',
  }
  confirmPassword = '';
  hide1: boolean = true;
  hide2: boolean = true;
  error: string | null = null;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  register(): void {
    this.error = null;

    if (this.user.password !== this.confirmPassword) {
      this.error = "Les mots de passe ne correspondent pas";
      return;
    }

    this.authService.register(this.user).subscribe({
      next: (res: any) => {
        console.log(res);
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

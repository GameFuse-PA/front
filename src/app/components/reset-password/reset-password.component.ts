import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPassword: User = {
    email: '',
  }

  email: string | null = null;
  error: string | null = null;
  ok: string | null = null;
  hide: boolean = true;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  resetPasswordAsks(): void {
    const token: string = this.authService.user?.access_token!;
    this.authService.newPassword(this.resetPassword, token).subscribe({
      next: (data: any) => {
        this.error = '';
        this.ok = data.message;
        setTimeout(() => {
          this.router.navigate(['/auth']);
        }, 7000);
      },
      error: (err) => {
        this.error = err.message;
        setTimeout(() => {
          this.router.navigate(['/auth']);
        }, 10000);
      },
    });
  }


}

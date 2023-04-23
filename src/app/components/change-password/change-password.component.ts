import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../models/user.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user: User = {
    email: '',
    password: '',
  }

  checkPassword: string|null = null;

  hide: boolean = true;
  ok: string|null = null;
  error: string | null = null;
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  resetPassword(): void {
    if (this.user.password !== this.checkPassword) {
      this.error = 'Les mots de passe ne correspondent pas';
      return;
    }
    this.authService.newPassword(this.user).subscribe({
      next: (data) => {
        const value: any = data;
        this.ok = value.message;
      },
      error: (err) => {
        this.error = err.error.message;
      }
    })
  }

  redirect(): void {
    this.router.navigate(['/auth']);
  }


}

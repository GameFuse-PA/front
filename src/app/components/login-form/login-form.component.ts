import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  email: string | null = null;
  password: string | null = null;
  hide: boolean = true;
  resetPassword: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  login(): void {
    console.log('login');
  }
}

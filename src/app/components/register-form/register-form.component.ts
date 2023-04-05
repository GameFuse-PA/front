import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  email: string | null = null;
  password: string | null = null;
  confirmPassword: string | null = null;
  hide1: boolean = true;
  hide2: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  register(): void {
    console.log('register');
  }

}

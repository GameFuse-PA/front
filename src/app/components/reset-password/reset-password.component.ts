import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  email: string | null = null;
  hide: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  resetPassword(): void {
    console.log('resetPassword');
  }


}

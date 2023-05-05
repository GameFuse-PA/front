import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-profilpagesolo',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit {

  changePassword = {
    password: '',
    checkPassword: ''
  }

  ok: string | null = null;
  error: string | null = null;

  constructor(private router: Router, private authServices: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authServices.resetPassword(this.changePassword).subscribe({
      next: (res: any) => {
        this.ok = "Si votre email est valide, vous allez recevoir un email avec un lien pour réinitialiser votre mot de passe.";
      },
      error: (err: Error) => {
        this.error = err.message;
      }
    })
  }

}

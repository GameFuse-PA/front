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

  profilPic: string|undefined = undefined
  ok: string | null = null;
  error: string | null = null;

  constructor(private router: Router, private authServices: AuthService) {
    if (this.authServices.user?.avatar){
      const user = JSON.parse(localStorage.getItem('user') as string)
      this.profilPic = user.avatar.location
    }
  }

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

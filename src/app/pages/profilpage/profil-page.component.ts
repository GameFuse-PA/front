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
    if (!this.changePassword.password || !this.changePassword.checkPassword){
      this.error = "Les champs ne peuvent pas être vides !"
      return
    }

    if (this.changePassword.password !== this.changePassword.checkPassword){
      this.error = "Les mots de passes doivent être identiques"
      return
    }

    this.authServices.newPassword(this.changePassword, this.authServices.user!.access_token!).subscribe({
      next: (res: any) => {
        this.ok = "Votre mot de passe à bien été changer";
      },
      error: (err: Error) => {
        this.error = err.message;
      }
    })
  }

}

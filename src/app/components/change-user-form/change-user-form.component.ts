import { Component, OnInit } from '@angular/core';
import {ConfigUserServices} from "../../services/configUserServices";
import {ImageInputUtils} from "../../../utils/ImageInputUtils";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-change-user-form',
  templateUrl: './change-user-form.component.html',
  styleUrls: ['./change-user-form.component.css']
})
export class ChangeUserFormComponent implements OnInit {

  user = {
    firstname: '',
    lastname: '',
    email: '',
    birthdate: '',
    password: '',
    confirmPassword: ''
  }

  ok: string | null = null;
  error: string | null = null;

  emailPlaceholder: string = "";

  hide1: boolean = true;
  hide2: boolean = true;

  profilPicOnServer: string|undefined = undefined;

  picture: string = "";
  imgCompil = this.image

  constructor(private image: ImageInputUtils, private service: ConfigUserServices) { }

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('user') as string);
    if (user){
      this.emailPlaceholder = user.email as string;
    }
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  submit(): void {
    this.service.updateProfil(localStorage.getItem('id') as string, this.user).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this.ok = "Votre profil a bien été modifié.";
        }
        this.error = res.message;
      },
      error: (err: Error) => {
        this.error = err.message;
      }
    })
  }

  protected readonly undefined = undefined;
}

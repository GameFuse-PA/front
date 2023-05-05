import { Component, OnInit } from '@angular/core';
import {ConfigUserServices} from "../../services/configUserServices";
import {ImageInputUtils} from "../../../utils/ImageInputUtils";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-user-form',
  templateUrl: './change-user-form.component.html',
  styleUrls: ['./change-user-form.component.css']
})
export class ChangeUserFormComponent implements OnInit {

  user = {
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    birthdate: undefined,
  }

  ok: string | null = null;
  error: string | null = null;

  userPlaceholder: any = {
    firstname: '',
    lastname: '',
    email: '',
    birthdate: '',
  }

  constructor(private image: ImageInputUtils, private service: ConfigUserServices, private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('user')){
      this.router.navigate(['/auth']);
      return;
    }
    this.userPlaceholder = JSON.parse(localStorage.getItem('user') as string);
  }

  submit(): void {
    this.service.updateProfil(this.user).subscribe({
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

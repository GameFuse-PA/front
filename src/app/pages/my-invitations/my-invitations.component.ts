import {Component, Input, OnInit} from '@angular/core';
import {ProfilService} from "../../services/profil/profil.service";
import {AuthService} from "../../services/auth/auth.service";
import {InvitationsModel} from "../../models/invitations.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-my-invitations',
  templateUrl: './my-invitations.component.html',
  styleUrls: ['./my-invitations.component.css']
})
export class MyInvitationsComponent implements OnInit {
  @Input() maxSize: number = 1
  invitations: InvitationsModel[] = [];
  page: number = 1;

  constructor(private profilServices: ProfilService, private authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getInvitations()
  }

  getInvitations() {
      this.profilServices.getInvitations().subscribe({
        next: (res: any) => {
          this.invitations = res;
        },
        error: (err: any) => {
          this._snackBar.open(err.message, "Fermer", {
            panelClass: ['error-snackbar'],
          })
        }
      })
  }

}

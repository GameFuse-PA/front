import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProfilService} from "../../services/profil/profil.service";
import {InvitationsModel} from "../../models/invitations.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {


  invitation: InvitationsModel|undefined;

  constructor(private profilService: ProfilService, private route: ActivatedRoute, private _snackBar: MatSnackBar, private router: Router) { }
  ngOnInit(): void {

    const id = this.route.snapshot.queryParamMap.get('token');
    if(!id) return;
    this.profilService.getInvitation(id).subscribe({
      next: (res: any) => {
        this.invitation = res;
      },
      error: (_: any) => {
        this._snackBar.open("Oups une erreur s'est produite", "Fermer", {
          duration: 2000,
          panelClass: ['error-snackbar'],
        })
        this.router.navigate(['/']);
      }
    })
  }

}

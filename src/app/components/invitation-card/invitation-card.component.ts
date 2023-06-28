import {Component, Input, OnInit} from '@angular/core';
import {InvitationsModel} from "../../models/invitations.model";
import {User} from "../../models/user.model";
import {FriendsService} from "../../services/friends/friends.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-invitation-card',
  templateUrl: './invitation-card.component.html',
  styleUrls: ['./invitation-card.component.css']
})
export class InvitationCardComponent implements OnInit {

  constructor(private friendService: FriendsService, private _snackBar: MatSnackBar, private router: Router) { }

  @Input() invitation: InvitationsModel | undefined;

  sender: User | undefined;

  ngOnInit(): void {
    this.sender = this.invitation?.sender;
  }

  acceptInvitation() {

    this.friendService.addFriend(this.sender!._id!).subscribe({
      next: (res: any) => {
        this._snackBar.open(res.message, "Fermer", {
          duration: 7000,
          panelClass: ['success-snackbar'],
        })
        this.router.navigate(['/profil']);
      },
      error: (err: any) => {
        this._snackBar.open(err.message, "Fermer", {
          panelClass: ['error-snackbar'],
        })
      }
    })
  }

  refuseInvitation() {
    this.friendService.refuseFriend(this.sender!._id!).subscribe({
      next: (res: any) => {
        this._snackBar.open(res.message, "Fermer", {
          duration: 7000,
          panelClass: ['error-snackbar'],
        })
        this.router.navigate(['/profil']);
      },
      error: (err: any) => {
        console.log(this.sender!._id!);
        this._snackBar.open(err.message, "Fermer", {
          panelClass: ['error-snackbar'],
        })
      }
    })
  }

}

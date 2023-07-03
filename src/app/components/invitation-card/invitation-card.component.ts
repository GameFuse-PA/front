import { Component, Input, OnInit } from '@angular/core';
import { InvitationsModel } from '../../models/invitations.model';
import { User } from '../../models/user.model';
import { FriendsService } from '../../services/friends/friends.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InvitationsService } from '../../services/invitations/invitations.service';

@Component({
    selector: 'app-invitation-card',
    templateUrl: './invitation-card.component.html',
    styleUrls: ['./invitation-card.component.css'],
})
export class InvitationCardComponent implements OnInit {
    constructor(
        private invitationsService: InvitationsService,
        private _snackBar: MatSnackBar,
        private router: Router,
    ) {}

    @Input() invitation: InvitationsModel | undefined;

    sender: User | undefined;

    ngOnInit(): void {
        this.sender = this.invitation?.sender;
    }

    acceptInvitation() {
        this.invitationsService.acceptInviteFriend(this.sender!._id!).subscribe({
            next: (_: any) => {
                this._snackBar.open('Ami ajouté', 'Fermer', {
                    duration: 7000,
                    panelClass: ['success-snackbar'],
                });
                this.router.navigate(['/profil']);
            },
            error: (err: any) => {
                this._snackBar.open(err.message, 'Fermer', {
                    panelClass: ['error-snackbar'],
                });
            },
        });
    }

    refuseInvitation() {
        this.invitationsService.refuseInviteFriend(this.sender!._id!).subscribe({
            next: (res: any) => {
                this._snackBar.open(res.message, 'Fermer', {
                    duration: 7000,
                    panelClass: ['error-snackbar'],
                });
                this.router.navigate(['/profil']);
            },
            error: (err: any) => {
                this._snackBar.open(err.message, 'Fermer', {
                    panelClass: ['error-snackbar'],
                });
            },
        });
    }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { User } from '../../models/user.model';
import {SearchModel} from "../../models/search.model";
import {InvitationsService} from "../../services/invitations/invitations.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
    selector: 'app-user-member-search',
    templateUrl: './user-member-search.component.html',
    styleUrls: ['./user-member-search.component.css'],
})
export class UserMemberSearchComponent implements OnInit {
    @Input() user: User |undefined;
    @Input() isFriend: boolean | undefined = true;
    @Input() isInvite: boolean | undefined = false;
    @Input() fromSearch: boolean = false;
    @Output() reload: EventEmitter<void> = new EventEmitter();
  constructor(private invitationsService: InvitationsService, private _snackBar: MatSnackBar, private router: Router) {}

    ngOnInit(): void {
    }


  acceptInvitation(id: string) {

    this.invitationsService.acceptInviteFriend(id).subscribe({
      next: (_: any) => {
        this._snackBar.open("Invitation accepté", "Fermer", {
          duration: 7000,
          panelClass: ['success-snackbar'],
        })
        this.reload.emit();
      },
      error: (err: any) => {
        this._snackBar.open(err.message, "Fermer", {
          panelClass: ['error-snackbar'],
        })
      }
    })
  }

  refuseInvitation(id: string) {
    this.invitationsService.refuseInviteFriend(id).subscribe({
      next: (res: any) => {
        this._snackBar.open(res.message, "Fermer", {
          duration: 7000,
          panelClass: ['error-snackbar'],
        })
        this.reload.emit();
      },
      error: (err: any) => {
        this._snackBar.open(err.message, "Fermer", {
          panelClass: ['error-snackbar'],
        })
      }
    })
  }

  protected readonly undefined = undefined;
}

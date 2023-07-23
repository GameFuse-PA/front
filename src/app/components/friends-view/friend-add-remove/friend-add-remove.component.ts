import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FriendsService } from '../../../services/friends/friends.service';
import { UsersService } from '../../../services/users/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-friend-add-remove',
    templateUrl: './friend-add-remove.component.html',
    styleUrls: ['./friend-add-remove.component.css'],
})
export class FriendAddRemoveComponent implements OnInit {
    constructor(
        private friendsServices: FriendsService,
        private userService: UsersService,
        private snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {}

    @Input() isFriend: boolean = false;
    @Input() idFriend: string = '';
    @Output() reload: EventEmitter<void> = new EventEmitter();

    addRemoveFriend() {
        if (this.isFriend) {
            this.friendsServices.removeFriend(this.idFriend).subscribe({
                next: (res) => {
                    this.snackBar.open('Ami supprimé', 'Fermer', {
                        duration: 5000,
                        panelClass: ['success-snackbar'],
                    });
                    this.reload.emit();
                },
                error: (err: Error) => {
                    this.snackBar.open(err.message, 'Fermer', {
                        duration: 5000,
                        panelClass: ['error-snackbar'],
                    });
                },
            });
        } else {
            this.userService.sendInvitations(this.idFriend).subscribe({
                next: (res) => {
                    this.snackBar.open('Invitation envoyé', 'Fermer', {
                        duration: 5000,
                        panelClass: ['success-snackbar'],
                    });
                    this.reload.emit();
                },
                error: (err: Error) => {
                    this.snackBar.open(err.message, 'Fermer', {
                        duration: 5000,
                        panelClass: ['error-snackbar'],
                    });
                },
            });
        }
    }
}

import { Component, Input, OnInit } from '@angular/core';
import { FriendsService } from '../../../services/friends/friends.service';

@Component({
    selector: 'app-friend-add-remove',
    templateUrl: './friend-add-remove.component.html',
    styleUrls: ['./friend-add-remove.component.css'],
})
export class FriendAddRemoveComponent implements OnInit {
    constructor(private friendsServices: FriendsService) {}

    error: string = '';
    ok: string = '';

    ngOnInit(): void {}

    @Input() isFriend: boolean = false;
    @Input() idFriend: string = '';

    addRemoveFriend() {
        if (!this.idFriend) {
            this.error = "Erreur à la récupération de l'ami";
            setTimeout(() => {
                this.error = '';
            }, 5000);
            return;
        }
        if (this.isFriend) {
            this.friendsServices.removeFriend(this.idFriend).subscribe({
                next: (res) => {
                    this.ok = 'Ami supprimé';
                    this.isFriend = false;
                    setTimeout(() => {
                        this.ok = '';
                        window.location.reload();
                    }, 10000);
                },
                error: (err: Error) => {
                    this.error = err.message;
                    setTimeout(() => {
                        this.error = '';
                    }, 10000);
                },
            });
        } else {
            this.friendsServices.addFriend(this.idFriend).subscribe({
                next: (res) => {
                    this.ok = 'Ami ajouté';
                    this.isFriend = true;
                    setTimeout(() => {
                        this.ok = '';
                        window.location.reload();
                    }, 10000);
                },
                error: (err: Error) => {
                    this.error = err.message;
                    setTimeout(() => {
                        this.error = '';
                    }, 10000);
                },
            });
        }
    }
}

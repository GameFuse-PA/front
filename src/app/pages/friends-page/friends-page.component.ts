import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../../services/profil/profil.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-friends-page',
    templateUrl: './friends-page.component.html',
    styleUrls: ['./friends-page.component.css'],
})
export class FriendsPageComponent implements OnInit {
    constructor(private profilServices: ProfilService) {}

    users: User[] | undefined;

    ngOnInit(): void {
        this.profilServices.getFriends().subscribe({
            next: (users: any) => {
                this.users = users.idFriend;
            },
            error: (err: any) => {
                alert(err.message);
            },
        });
    }
}

import { Component, Input, OnInit } from '@angular/core';
import { ProfilService } from '../../services/profil/profil.service';
import { User } from '../../models/user.model';
import { Collection } from 'ngx-pagination';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-friends-page',
    templateUrl: './friends-page.component.html',
    styleUrls: ['./friends-page.component.css'],
})
export class FriendsPageComponent implements OnInit {
    constructor(private profilServices: ProfilService, private authServices: AuthService) {}

    users: Collection<User | undefined> = [];
    page: number = 1;

    @Input() pagination: boolean = true;
    @Input() maxSize: number = 10;
    ngOnInit(): void {
        this.profilServices.getFriends().subscribe({
            next: (users: any) => {
                if (users && users.idFriends) {
                    this.users = users.idFriends;
                    const user = JSON.parse(localStorage.getItem('user') as string);
                    user.friends = users.idFriends;
                    this.authServices.user = user;
                    localStorage.setItem('user', JSON.stringify(user));
                }
            },
            error: (err: any) => {
                alert(err.message);
            },
        });
    }
}

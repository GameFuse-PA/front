import {Component, Input, OnInit} from '@angular/core';
import { ProfilService } from '../../services/profil/profil.service';
import { User } from '../../models/user.model';
import {Collection} from "ngx-pagination";
import {AuthService} from "../../services/auth/auth.service";
import {UsersService} from "../../services/users/users.service";

@Component({
    selector: 'app-friends-page',
    templateUrl: './friends-page.component.html',
    styleUrls: ['./friends-page.component.css'],
})
export class FriendsPageComponent implements OnInit {
    constructor(private profilServices: ProfilService, private authServices: AuthService, private usersService: UsersService) {}

    users: Collection<User | undefined> = [];
    page: number = 1;

    @Input() pagination: boolean = true

    userSearch: string = '';

    ngOnInit(): void {
        this.profilServices.getFriends().subscribe({
            next: (users: any) => {
                this.users = users.idFriend;
                const user = JSON.parse(localStorage.getItem('user') as string);
                user.friends = users.idFriend;
                this.authServices.user = user;
                localStorage.setItem('user', JSON.stringify(user));
            },
            error: (err: any) => {
                alert(err.message);
            },
        });
    }

    search(newValue: string) {
        this.userSearch = newValue;
        this.usersService.searchUsers(newValue).subscribe({
            next: (users: any) => {
              console.log(users);
            },
            error: (err: any) => {
                alert(err.message);
            }
        })
    }

}

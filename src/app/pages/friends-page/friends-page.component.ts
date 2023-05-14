import {Component, Input, OnInit} from '@angular/core';
import { ProfilService } from '../../services/profil/profil.service';
import { User } from '../../models/user.model';
import {Collection} from "ngx-pagination";

@Component({
    selector: 'app-friends-page',
    templateUrl: './friends-page.component.html',
    styleUrls: ['./friends-page.component.css'],
})
export class FriendsPageComponent implements OnInit {
    constructor(private profilServices: ProfilService) {}

    users: Collection<User | undefined> = [];
    page: number = 1;

    @Input() pagination: boolean = true
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

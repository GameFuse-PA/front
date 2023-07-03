import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import {Router} from "@angular/router";

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {
    constructor(private router: Router) {}

    @Input() friends: User[] = [];

    ngOnInit(): void {}

    reloadFriends() {
      this.ngOnInit()
    }

    @Input() user: User | undefined = undefined;
    protected readonly undefined = undefined;
}

import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    @Input() user: User | undefined = undefined;
    protected readonly undefined = undefined;
}

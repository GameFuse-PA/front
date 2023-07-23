import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {
    constructor() {}

    @Input() friends: User[] = [];
    @Output() reload: EventEmitter<void> = new EventEmitter();

    ngOnInit(): void {}

    reloadFriends() {
        this.reload.emit();
    }

    @Input() user: User | undefined = undefined;
    protected readonly undefined = undefined;
}

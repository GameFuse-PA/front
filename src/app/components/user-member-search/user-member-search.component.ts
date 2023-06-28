import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import {SearchModel} from "../../models/search.model";

@Component({
    selector: 'app-user-member-search',
    templateUrl: './user-member-search.component.html',
    styleUrls: ['./user-member-search.component.css'],
})
export class UserMemberSearchComponent implements OnInit {
    @Input() searchUsers: SearchModel[] = [];
    users: User[] = [];
  constructor() {}

    ngOnInit(): void {
        this.users = this.searchUsers.map((user) => user.user!);
    }
}

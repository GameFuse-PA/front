import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import {SearchModel} from "../../models/search.model";

@Component({
    selector: 'app-user-member-search',
    templateUrl: './user-member-search.component.html',
    styleUrls: ['./user-member-search.component.css'],
})
export class UserMemberSearchComponent implements OnInit {
    @Input() user: User |undefined;
    @Input() isFriend: boolean | undefined = true;
    @Input() isInvite: boolean | undefined = false;
    @Input() fromSearch: boolean = false;
  constructor() {}

    ngOnInit(): void {
    }

  protected readonly undefined = undefined;
}

import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {UsersService} from "../../services/users/users.service";

@Component({
  selector: 'app-user-member-search',
  templateUrl: './user-member-search.component.html',
  styleUrls: ['./user-member-search.component.css']
})
export class UserMemberSearchComponent implements OnInit {

  @Input() users: User[] | null = []

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

}

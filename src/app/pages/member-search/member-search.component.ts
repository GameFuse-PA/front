import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users/users.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})
export class MemberSearchComponent implements OnInit {

  search: string = '';
  users = this.usersServices.user;
  constructor(private usersServices: UsersService, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.routes.queryParams.subscribe(params => {
      this.search = params['search'];
    })
  }

  searchUser(newValue: string) {
    this.search = newValue;
    this.usersServices.searchUsers(newValue).subscribe({
      next: (users: any) => {
        this.users = users;
      },
      error: (err: any) => {
        alert(err.message);
      }
    })
  }

}

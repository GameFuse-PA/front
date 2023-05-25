import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})
export class MemberSearchComponent implements OnInit {

  search: string = '';
  users: User[] = [];
  constructor(private usersServices: UsersService, private routes: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.routes.queryParams.subscribe(params => {
      this.search = params['search'];
      this.searchUser(this.search)
    })
  }

  searchUser(newValue: string) {
    this.search = newValue;
    this.usersServices.searchUsers(newValue).subscribe({
      next: (users: any) => {
        this.users = users;
        this.router.navigate([], {relativeTo: this.routes, queryParams: {search: newValue}})
      },
      error: (err: any) => {
        alert(err.message);
      }
    })
  }

}

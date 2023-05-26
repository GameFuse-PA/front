import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-user-member-search',
  templateUrl: './user-member-search.component.html',
  styleUrls: ['./user-member-search.component.css']
})
export class UserMemberSearchComponent implements OnInit {

  @Input() users: User[] = []
  @Input() isFriends: boolean[] = []

  constructor(private authServices: AuthService) { }

  ngOnInit(): void {
  }
}

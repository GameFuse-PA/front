import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friend-add-remove',
  templateUrl: './friend-add-remove.component.html',
  styleUrls: ['./friend-add-remove.component.css']
})
export class FriendAddRemoveComponent implements OnInit {

  isFriend: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  addRemoveFriend() {
    if (this.isFriend) {
      // TODO: remove friend
      // this.removeFriend();
    } else {
      // TODO: add friend
      // this.addFriend();
    }
  }

}

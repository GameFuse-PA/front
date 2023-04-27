import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-friend-add-remove',
  templateUrl: './friend-add-remove.component.html',
  styleUrls: ['./friend-add-remove.component.css']
})
export class FriendAddRemoveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() isFriend: boolean = false;

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

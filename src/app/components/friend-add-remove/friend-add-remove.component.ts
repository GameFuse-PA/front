import {Component, Input, OnInit} from '@angular/core';
import {FriendsService} from "../../services/friends/friends.service";

@Component({
  selector: 'app-friend-add-remove',
  templateUrl: './friend-add-remove.component.html',
  styleUrls: ['./friend-add-remove.component.css']
})
export class FriendAddRemoveComponent implements OnInit {

  constructor(private friendsServices: FriendsService) { }

  idFriend: string = "";
  error: string = "";
  ok: string = "";

  ngOnInit(): void {
  }

  @Input() isFriend: boolean = false;

  addRemoveFriend() {
    if (!this.idFriend) {
      this.error = "Erreur à la récupération de l'ami";
      return;
    }
    if (this.isFriend) {
      this.friendsServices.removeFriend(this.idFriend).subscribe({
        next: (res) => {
          this.ok = "Ami supprimé";
          this.isFriend = false;
        },
        error: (err: Error) => {
          this.error = err.message;
        }
      })

    } else {
      this.friendsServices.addFriend(this.idFriend).subscribe({
        next: (res) => {
          this.ok = "Ami ajouté";
          this.isFriend = true;
        },
        error: (err: Error) => {
          this.error = err.message;
        }
      });
    }
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {GameSessionModel} from "../../models/game-session.model";
import {Collection} from "ngx-pagination";
import {ProfilService} from "../../services/profil/profil.service";

@Component({
  selector: 'app-list-parties',
  templateUrl: './list-game-session.component.html',
  styleUrls: ['./list-game-session.component.css']
})
export class ListGameSessionComponent implements OnInit {

  readonly user: User = JSON.parse(localStorage.getItem('user') || '{}');
  parties: Collection<GameSessionModel> = [];

  page: number = 1;

  @Input() maxSize: number = 5

  constructor(private profilService: ProfilService) { }

  ngOnInit(): void {

    this.profilService.getParties().subscribe({
      next: (parties: any) => {
        this.parties = parties;
      },
      error: (err: any) => {

      }
    })
  }

}

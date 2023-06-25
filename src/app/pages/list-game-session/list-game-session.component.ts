import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {Collection} from "ngx-pagination";
import {ProfilService} from "../../services/profil/profil.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateGameSessionDialogComponent} from "../../components/game-session/create-game-session-dialog/create-game-session-dialog.component";
import {GameSessionModel} from "../../models/game-session.model";

@Component({
  selector: 'app-list-game-session',
  templateUrl: './list-game-session.component.html',
  styleUrls: ['./list-game-session.component.css']
})
export class ListGameSessionComponent implements OnInit {

  readonly user: User = JSON.parse(localStorage.getItem('user') || '{}');
  gameSessions: Collection<GameSessionModel> = [];

  page: number = 1;

  @Input() maxSize: number = 5

  constructor(private profilService: ProfilService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.profilService.getGameSessions().subscribe({
      next: (gameSessions: any) => {
        this.gameSessions = gameSessions;
      },
      error: (err: any) => {

      }
    })
  }

  createParty() {
    this.dialog.open(CreateGameSessionDialogComponent, {
      width: '700px',
      autoFocus: false,
      disableClose: true,
    });
  }

}

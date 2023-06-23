import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {PartyModel} from "../../models/party.model";
import {Collection} from "ngx-pagination";
import {ProfilService} from "../../services/profil/profil.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateGameSessionDialogComponent} from "../../components/game-session/create-game-session-dialog/create-game-session-dialog.component";

@Component({
  selector: 'app-list-parties',
  templateUrl: './list-game-session.component.html',
  styleUrls: ['./list-game-session.component.css']
})
export class ListGameSessionComponent implements OnInit {

  readonly user: User = JSON.parse(localStorage.getItem('user') || '{}');
  parties: Collection<PartyModel> = [];

  page: number = 1;

  @Input() maxSize: number = 5

  constructor(private profilService: ProfilService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.profilService.getParties().subscribe({
      next: (parties: any) => {
        this.parties = parties;
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

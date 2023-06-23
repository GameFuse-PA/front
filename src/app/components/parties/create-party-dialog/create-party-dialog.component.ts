import { Component, OnInit } from '@angular/core';
import {Game} from "../../../models/game.model";
import {User} from "../../../models/user.model";
import {UsersService} from "../../../services/users/users.service";
import {ProfilService} from "../../../services/profil/profil.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl} from "@angular/forms";
import {PartyModel} from "../../../models/party.model";

@Component({
  selector: 'app-create-party-dialog',
  templateUrl: './create-party-dialog.component.html',
  styleUrls: ['./create-party-dialog.component.css']
})
export class CreatePartyDialogComponent implements OnInit {


  session: PartyModel = {
    name: undefined,
    game: undefined,
    winner: undefined,
    createdBy: undefined,
    members: undefined
  };

  listGames: Game[] = []
  listUsers: User[] = []

  loading: boolean = false;

  users = new FormControl('');

  constructor(private profilService: ProfilService, private _snackBar: MatSnackBar) { }
  ngOnInit(): void {

    this.profilService.getFriends().subscribe({
      next: (friends: any) => {
        if (friends.length === 0) {
          this._snackBar.open("Vous n'avez pas d'ami malheureusement", 'Fermer', {
            duration: 5000,
            panelClass: ['error-snackbar'],
          })
          return
        }
        this.listUsers = friends.idFriends;
      },
      error: () => {
        this._snackBar.open("Vous n'avez pas d'ami malheureusement", 'Fermer', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        })
      }
    })

    this.profilService.getGames().subscribe({
      next: (games: any) => {
        if (games.length === 0) {
          this._snackBar.open("Il n'y a aucun jeu de disponible, veuillez créer un jeu avant", 'Fermer', {
            duration: 5000,
            panelClass: ['error-snackbar'],
          })
          return
        }
        this.listGames = games;
      },
      error: (err: any) => {
        this._snackBar.open("Il n'y a aucun jeu de disponible, veuillez créer un jeu avant", 'Fermer', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        })
      }
    })
  }


  onCreateRoom(){

    if (!this.users.value || !this.session.name || !this.session.game) {
      return
    }

    this.session.members = this.users.value
    console.log(this.session)

  }

  protected readonly FormControl = FormControl;
}

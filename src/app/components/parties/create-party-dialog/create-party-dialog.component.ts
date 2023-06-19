import { Component, OnInit } from '@angular/core';
import {Game} from "../../../models/game.model";
import {User} from "../../../models/user.model";
import {UsersService} from "../../../services/users/users.service";
import {ProfilService} from "../../../services/profil/profil.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-party-dialog',
  templateUrl: './create-party-dialog.component.html',
  styleUrls: ['./create-party-dialog.component.css']
})
export class CreatePartyDialogComponent implements OnInit {


  listGames: Game[] = []
  listUsers: User[] = []

  loading: boolean = false;

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

}

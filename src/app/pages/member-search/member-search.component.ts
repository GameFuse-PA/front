import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {SearchModel} from "../../models/search.model";

@Component({
    selector: 'app-member-search',
    templateUrl: './member-search.component.html',
    styleUrls: ['./member-search.component.css'],
})
export class MemberSearchComponent implements OnInit {
    search: string = '';
    searchResult: boolean = false;
    users: SearchModel[] = [];
    constructor(
        private usersServices: UsersService,
        private routes: ActivatedRoute,
        private router: Router,
        private authServices: AuthService,
        private _snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
    }

    searchUser(newValue: string) {
        this.usersServices.searchUsers(newValue).subscribe({
          next: (users: any) => {
            this.users = users;
            this.searchResult = true;
          },
          error: (_: any) => {
            this._snackBar.open(
              "Une erreur s'est produite lors de la recherche",
              'Fermer',
              {
                duration: 5000,
                panelClass: ['error-snackbar'],
              },
            );
            },
        });
    }
}

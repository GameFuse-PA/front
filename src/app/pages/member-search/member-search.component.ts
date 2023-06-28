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
    users: SearchModel[] = [];
    constructor(
        private usersServices: UsersService,
        private routes: ActivatedRoute,
        private router: Router,
        private authServices: AuthService,
        private _snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
        this.routes.queryParams.subscribe((params) => {
            this.search = params['search'];
            this.searchUser(this.search);
        });
    }

    searchUser(newValue: string) {
        this.search = newValue;
        this.usersServices.searchUsers(newValue).subscribe({
            next: (users: any) => {
                this.users = users;
                this.router.navigate([], {
                    relativeTo: this.routes,
                    queryParams: { search: newValue },
                });
            },
            error: (_: any) => {
                this._snackBar.open(
                    'Une valeur de recherche est nécessaire avant de confirmer',
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

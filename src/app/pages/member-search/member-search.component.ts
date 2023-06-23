import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-member-search',
    templateUrl: './member-search.component.html',
    styleUrls: ['./member-search.component.css'],
})
export class MemberSearchComponent implements OnInit {
    search: string = '';
    users: User[] = [];
    isFriends: boolean[] = [];
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
                this.isFriends = [];
                for (const user of users) {
                    if (this.authServices.user?.friends) {
                        if (
                            this.authServices.user.friends.filter((u: any) => u._id === user._id)
                                .length > 0
                        ) {
                            this.isFriends.push(true);
                        } else {
                            this.isFriends.push(false);
                        }
                    }
                }
                this.users = users;
                this.router.navigate([], {
                    relativeTo: this.routes,
                    queryParams: { search: newValue },
                });
            },
            error: (err: any) => {
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

import { Component, Input, OnInit } from '@angular/core';
import { ProfilService } from '../../services/profil/profil.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { Collection } from 'ngx-pagination';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-friends-page',
    templateUrl: './friends-page.component.html',
    styleUrls: ['./friends-page.component.css'],
})
export class FriendsPageComponent implements OnInit {
    constructor(
        private profilServices: ProfilService,
        private authServices: AuthService,
        private _snackBar: MatSnackBar,
        private router: Router,
    ) {}

    users: Collection<User | undefined> = [];
    page: number = 1;

    @Input() pagination: boolean = true;
    @Input() maxSize: number = 10;

    userSearch: string = '';

    ngOnInit(): void {
        this.profilServices.getFriends().subscribe({
            next: (users: any) => {
                if (users && users.friends) {
                    this.users = users.friends;
                }
            },
            error: (err: any) => {
                this._snackBar.open(err.message, 'Fermer', {
                    duration: 5000,
                    panelClass: ['error-snackbar'],
                });
            },
        });
    }

    search(newValue: string) {
        if (!newValue) {
            this._snackBar.open(
                'Une valeur de recherche est nécessaire avant de confirmer',
                'Fermer',
                {
                    duration: 5000,
                    panelClass: ['error-snackbar'],
                },
            );
            return;
        }
        this.userSearch = newValue;
        this.router.navigate(['/member-search'], { queryParams: { search: newValue } });
    }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {}

    playGame() {
        if (this.authService.user) {
            this.router.navigate(['/my-game-sessions']);
        } else {
            this.router.navigate(['/auth']);
        }
    }
}

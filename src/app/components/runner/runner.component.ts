import { Component, Input, OnInit } from '@angular/core';
import { RunnerService } from '../../services/runner/runner.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-runner',
    templateUrl: './runner.component.html',
    styleUrls: ['./runner.component.css'],
})
export class RunnerComponent implements OnInit {
    constructor(
        private runnerService: RunnerService,
        private sanitizer: DomSanitizer,
        private authService: AuthService,
        private snackBar: MatSnackBar,
    ) {}

    @Input() gameSessionId: string = '';
    html: string = '';
    canPlay: boolean = false;
    infoMessage: string = '';
    actionMessage: string = '';
    action: any = {};

    ngOnInit(): void {
        this.retrieveState();
    }

    retrieveState() {
        this.runnerService.retrieveState(this.gameSessionId).subscribe({
            next: (res: any) => {
                this.handleResponse(res);
            },
            error: (err: Error) => {
                this.snackBar.open(err.message, 'Fermer', {
                    duration: 3000,
                    panelClass: ['error-snackbar'],
                });
            },
        });
    }

    handleResponse(res: any) {
        this.infoMessage = '';
        this.actionMessage = '';

        if (res.game_state.game_over == true) {
            this.infoMessage = `La partie est terminée. ${res.game_state.winner.username} a gagné !`;
            this.canPlay = false;
        } else {
            this.canPlay = res.requested_actions.find(
                (action: any) => action.player._id === this.authService.user!._id,
            );

            this.action = res.requested_actions[0];
            this.infoMessage = `C'est au tour de ${this.action.player.username} de jouer.`;
            this.actionMessage = `(Action demandée : ${this.action.type})`;
        }

        const display = res.displays.find(
            (display: any) => display.player._id === this.authService.user!._id,
        );
        const svg = this.runnerService.buildHtml(display);
        this.html = this.sanitizer.bypassSecurityTrustHtml(svg) as string;
    }

    handleClick(event: any) {
        if (!this.canPlay) {
            return;
        }

        const svgElement = event.target as SVGElement;
        const zone = svgElement.getBoundingClientRect();
        const xCoord = event.clientX - zone.left;
        const yCoord = event.clientY - zone.top;

        if (!this.canClick(xCoord, yCoord)) {
            return;
        }

        const action = {
            x: xCoord,
            y: yCoord,
            type: 'CLICK',
        };

        this.runnerService.sendAction(this.gameSessionId, action).subscribe({
            next: (res: any) => {
                this.handleResponse(res);
            },
            error: (err: Error) => {
                this.snackBar.open(err.message, 'Fermer', {
                    duration: 3000,
                    panelClass: ['error-snackbar'],
                });
            },
        });
    }

    canClick(x: number, y: number) {
        const zones = this.action.zones;

        return zones.find(
            (zone: any) =>
                zone.x <= x && zone.x + zone.width >= x && zone.y <= y && zone.y + zone.height >= y,
        );
    }
}
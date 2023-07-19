import { Component, HostListener, Input, OnInit } from '@angular/core';
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
    @Input() inputFocused: boolean = false;
    html: string = '';
    canPlay: boolean = false;
    infoMessage: string = '';
    actionMessage: string = '';
    text: string = '';
    textError: string = '';
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

    // TO DELETE !!!
    fakeAction() {
        this.action.type = 'KEY';
        this.action.keys = 'ZQSD';
    }

    handleResponse(res: any) {
        console.log(res);
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
            this.fakeAction();
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

        this.sendAction(action);
    }

    canClick(x: number, y: number) {
        const zones = this.action.zones;

        return zones.find(
            (zone: any) =>
                zone.x <= x && zone.x + zone.width >= x && zone.y <= y && zone.y + zone.height >= y,
        );
    }

    sendAction(action: any) {
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

    handleText() {
        this.textError = '';

        if (this.action.regex) {
            const regex = new RegExp(this.action.regex);
            if (!regex.test(this.text)) {
                this.textError = 'La valeur saisie ne correspond pas au format attendu.';
                return;
            }
        }

        if (
            (this.action.max_length && this.text.length > this.action.max_length) ||
            this.text.length > 64
        ) {
            this.textError = 'La valeur saisie est trop longue.';
            return;
        }

        const action = {
            text: this.text,
            type: 'TEXT',
        };

        this.sendAction(action);
    }

    @HostListener('document:keypress', ['$event'])
    handleKey(event: KeyboardEvent) {
        if (this.action.type !== 'KEY') {
            return;
        }

        if (this.inputFocused) {
            // chat input is focused, do not handle keypress
            return;
        }

        const key = event.key.toUpperCase();

        if (this.action.keys.includes(key)) {
            const action = {
                key: key,
                type: 'KEY',
            };

            this.sendAction(action);
        }
    }
}

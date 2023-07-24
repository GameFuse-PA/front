import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { RunnerService } from '../../services/runner/runner.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SaveGameDialogComponent } from '../save-game-dialog/save-game-dialog.component';
import { ConfirmActionComponent } from '../confirm-action/confirm-action.component';
import { WebsocketService } from '../../services/websocket/websocket.service';

@Component({
    selector: 'app-runner',
    templateUrl: './runner.component.html',
    styleUrls: ['./runner.component.css'],
})
export class RunnerComponent implements OnInit, OnDestroy {
    constructor(
        private runnerService: RunnerService,
        private sanitizer: DomSanitizer,
        private authService: AuthService,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
        private websocketService: WebsocketService,
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
    loading: boolean = false;

    ngOnInit(): void {
        this.retrieveState();

        this.websocketService.connectRunner(this.gameSessionId);

        this.websocketService.socket.on('action-runner', (res: any) => {
            this.handleResponse(res);
        });
    }

    ngOnDestroy(): void {
        this.websocketService.disconnectRunner(this.gameSessionId);

        this.websocketService.socket.off('action-runner');
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
            if (res.game_state.winner == null) {
                this.infoMessage = `La partie est terminée. Il y a égalité !`;
            } else {
                this.infoMessage = `La partie est terminée. ${res.game_state.winner.username} a gagné !`;
            }

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

    disableDefault(event: any) {
        event.preventDefault();
    }

    handleAuxClick(event: any) {
        if (event.button == 1) {
            this.handleClick(event, 'MIDDLE');
        } else if (event.button == 2) {
            this.handleClick(event, 'RIGHT');
        }
    }

    handleClick(event: any, button: string) {
        if (!this.canPlay || this.action.type !== 'CLICK') {
            return;
        }

        const svgElement = event.target as SVGElement;
        const zone = svgElement.getBoundingClientRect();
        const xCoord = event.clientX - zone.left;
        const yCoord = event.clientY - zone.top;

        if (!this.canClick(xCoord, yCoord, button)) {
            return;
        }

        const action = {
            x: xCoord,
            y: yCoord,
            type: 'CLICK',
            button: button,
        };

        if (this.action.confirm) {
            this.confirmAction(action);
            return;
        }

        this.sendAction(action);
    }

    confirmAction(action: any) {
        const ref = this.dialog.open(ConfirmActionComponent, {
            width: '700px',
            autoFocus: false,
            disableClose: true,
            data: {
                action: action,
            },
        });

        ref.componentInstance.confirm.subscribe((res: any) => {
            this.sendAction(action);
        });
    }

    canClick(x: number, y: number, button: string) {
        if ((this.action.buttons && !this.action.buttons.includes(button)) || button !== 'LEFT') {
            return false;
        }

        const zones = this.action.zones;

        return zones.find(
            (zone: any) =>
                zone.x <= x && zone.x + zone.width >= x && zone.y <= y && zone.y + zone.height >= y,
        );
    }

    async sendAction(action: any) {
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.runnerService.sendAction(this.gameSessionId, action).subscribe({
            next: (res: any) => {
                this.loading = false;
                this.websocketService.emitAction(res, this.gameSessionId);
                this.handleResponse(res);
            },
            error: (err: Error) => {
                this.loading = false;
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

        if (this.action.confirm) {
            this.confirmAction(action);
            return;
        }

        this.sendAction(action);
    }

    @HostListener('document:keypress', ['$event'])
    handleKey(event: KeyboardEvent) {
        const key = event.key.toUpperCase();

        if (
            this.action.type !== 'KEY' ||
            this.inputFocused ||
            (this.action.keys && !this.action.keys.includes(key))
        ) {
            return;
        }

        const action = {
            key: key,
            type: 'KEY',
        };

        if (this.action.confirm) {
            this.confirmAction(action);
            return;
        }

        this.sendAction(action);
    }
}

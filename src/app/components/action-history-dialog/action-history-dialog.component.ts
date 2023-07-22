import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { GameSessionService } from '../../services/game-session/game-session.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RunnerService } from '../../services/runner/runner.service';
import { WebsocketService } from '../../services/websocket/websocket.service';

@Component({
    selector: 'app-action-history-dialog',
    templateUrl: './action-history-dialog.component.html',
    styleUrls: ['./action-history-dialog.component.css'],
})
export class ActionHistoryDialogComponent implements OnInit {
    actionHistory: any[] = [];
    @Output() reloadRunner: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private gameSessionService: GameSessionService,
        @Inject(MAT_DIALOG_DATA) public gameSessionId: string,
        private snackBar: MatSnackBar,
        private runnerService: RunnerService,
        private websocketService: WebsocketService,
        public dialogRef: MatDialogRef<ActionHistoryDialogComponent>,
    ) {}

    ngOnInit(): void {
        this.getActionHistory();
    }

    getActionHistory() {
        return this.gameSessionService.getGameSession(this.gameSessionId).subscribe({
            next: (res: any) => {
                this.actionHistory = res.actions;
            },
            error: (err: Error) => {
                this.snackBar.open(err.message, 'Fermer', {
                    duration: 3000,
                    panelClass: ['error-snackbar'],
                });
            },
        });
    }

    buildActionDetail(action: any) {
        if (action.type === 'CLICK') {
            return `au coordonnées x : ${action.x}, y : ${action.y}`;
        } else if (action.type === 'KEY') {
            return `appuie sur la touche ${action.key}`;
        } else if (action.type === 'TEXT') {
            return `envoie de "${action.text}"`;
        } else {
            return '';
        }
    }

    resetToAction(actionId: string) {
        this.runnerService.resetToAction(this.gameSessionId, actionId).subscribe({
            next: (res: any) => {
                this.websocketService.emitAction(res, this.gameSessionId);
                this.reloadRunner.emit();
                this.dialogRef.close();
            },
            error: (err: Error) => {
                this.snackBar.open(err.message, 'Fermer', {
                    duration: 3000,
                    panelClass: ['error-snackbar'],
                });
            },
        });
    }
}

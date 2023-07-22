import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RunnerService } from '../../services/runner/runner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebsocketService } from '../../services/websocket/websocket.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmActionComponent } from '../confirm-action/confirm-action.component';
import { ActionHistoryDialogComponent } from '../action-history-dialog/action-history-dialog.component';

@Component({
    selector: 'app-alter-runner',
    templateUrl: './alter-runner.component.html',
    styleUrls: ['./alter-runner.component.css'],
})
export class AlterRunnerComponent implements OnInit {
    @Input() gameSessionId: string = '';
    @Output() reloadRunner: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private websocketService: WebsocketService,
        private snackBar: MatSnackBar,
        private runnerService: RunnerService,
        private dialog: MatDialog,
    ) {}

    ngOnInit(): void {}

    resetGame() {
        this.runnerService.resetGame(this.gameSessionId).subscribe({
            next: (res: any) => {
                this.websocketService.emitAction(res, this.gameSessionId);
                this.reloadRunner.emit();
            },
            error: (err: Error) => {
                this.snackBar.open(err.message, 'Fermer', {
                    duration: 3000,
                    panelClass: ['error-snackbar'],
                });
            },
        });
    }

    showHistory() {
        const res = this.dialog.open(ActionHistoryDialogComponent, {
            width: '700px',
            autoFocus: false,
            disableClose: true,
            data: this.gameSessionId,
        });

        res.componentInstance.reloadRunner.subscribe(() => {
            this.reloadRunner.emit();
        });
    }
}

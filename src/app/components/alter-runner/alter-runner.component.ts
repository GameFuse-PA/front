import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RunnerService } from '../../services/runner/runner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebsocketService } from '../../services/websocket/websocket.service';

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
        console.log('showHistory');
    }
}

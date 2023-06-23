import { Component, OnInit } from '@angular/core';
import { RunnerService } from '../../services/runner/runner.service';

@Component({
    selector: 'app-game-runner',
    templateUrl: './game-runner.component.html',
    styleUrls: ['./game-runner.component.css'],
})
export class GameRunnerComponent implements OnInit {
    constructor(private runnerService: RunnerService) {}

    pid: number | null = null;

    ngOnInit(): void {
        this.startGame('6494ad1d250bf9dfe6fc7ccc');
    }

    startGame(gameId: string) {
        this.runnerService.start(gameId).subscribe((res: any) => {
            console.log(res);
            this.pid = res.message!.pid;
        });
    }

    sendMessage() {
        this.runnerService.sendMessage(this.pid!, 'Hello World').subscribe((res: any) => {
            console.log(res);
        });
    }
}

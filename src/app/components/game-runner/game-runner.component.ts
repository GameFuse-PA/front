import { Component, OnInit } from '@angular/core';
import { RunnerService } from '../../services/runner/runner.service';

@Component({
    selector: 'app-game-runner',
    templateUrl: './game-runner.component.html',
    styleUrls: ['./game-runner.component.css'],
})
export class GameRunnerComponent implements OnInit {
    constructor(private runnerService: RunnerService) {}

    ngOnInit(): void {
        this.startGame('648f2eafcae049b2d8e3845d');
    }

    startGame(gameId: string) {
        this.runnerService.start(gameId).subscribe((res) => {
            console.log(res);
        });
    }
}

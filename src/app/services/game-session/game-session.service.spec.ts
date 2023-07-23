import { TestBed } from '@angular/core/testing';

import { GameSessionService } from './game-session.service';
import { HttpClientModule } from '@angular/common/http';

describe('GameSession.ServiceService', () => {
    let service: GameSessionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
        });
        service = TestBed.inject(GameSessionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

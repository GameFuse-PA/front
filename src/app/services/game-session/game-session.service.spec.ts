import { TestBed } from '@angular/core/testing';

import { GameSessionService } from './game-session.service';

describe('GameSession.ServiceService', () => {
    let service: GameSessionService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GameSessionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

import { TestBed } from '@angular/core/testing';

import { GameSession.ServiceService } from './game-session.service.service';

describe('GameSession.ServiceService', () => {
  let service: GameSession.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameSession.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

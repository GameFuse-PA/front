import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSessionCardComponent } from './game-session-card.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('GameSessionCardComponent', () => {
    let component: GameSessionCardComponent;
    let fixture: ComponentFixture<GameSessionCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [GameSessionCardComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GameSessionCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
